(function() {
    'use strict';
   
     angular
            .module('app')
            .directive('childrenRepeat', ChildrenRepeat);

       function ChildrenRepeat(){
          return {
            transclude : 'element',
            compile : function(element, attr, linker){

              return function($scope, $element, $attr){
                    var myLoop = $attr.childrenRepeat;
                    var match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);   /// A FAIRE TRACK BY
                    var indexString = match[1], collectionString = match[2], elements = [];


                    var parent =$element.parent();
                     var parentNode =(parent[0].nodeName);

                     $scope.$watch(collectionString, function(collection){
                       parent.children().remove();


                       buildList(collection,parent,0);

                     function buildList(collection,parent,nv){
                             if(nv!==0){
                                var block =angular.element(document.createElement(parentNode)) ;
                                block.addClass("lv"+nv);
                                parent.append(block); 
                                parent=block;
                         }
                          nv++;

                       for (var i = 0; i < collection.length; i++) {
                           var childScope = $scope.$new();
                           childScope[indexString] = collection[i];

                           childScope["$self"]={
                               id:i,
                               level:nv,
                               parent:collection
                           };
                          linker(childScope, function(clone){
                        clone.removeAttr('children-repeat');   /// A FAIRE PARENT APPEND

                           parent.append(clone); 
                           clone.on('$destroy', function() {
                               childScope.$destroy();
                           });


                           if(collection[i].children){ 

                               buildList(collection[i].children,clone,nv);
                           }


                        });
                      };
                  };
                }, true);

             //   $element.replaceWith(parent);


              }
            }
          };
        };
        
       
})();
