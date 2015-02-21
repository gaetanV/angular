(function() {
    'use strict';

    angular
            .module('app')
            .directive('quickEdit', QuickEdit);

    QuickEdit.$inject = ["$compile"];
    function QuickEdit($compile) {
         
        return {

               transclude:true,
               compile:compile,
         
               
           };
           
         function compile($element, $attr,transclude) {
             
                   return { pre:link};
                    function link($scope, element){  
                              $scope.model=$attr.quickEdit;
                              $scope.switch=function(id){
                                      $scope.model=id;
                                   
                                }   
                         $scope.$watch("model", function(model) {
                                transclude($scope, function(clone) {
                                      for(var i=0; i<clone.length ; i++){
                                           if(  clone[i].id ===model) {
                                               
                                               element.children().remove();
                                               var att=clone[i].getAttribute("quick-action");
                                               if(att){
                                                    $scope[att]($scope); 
                                               };
     
                                               element.append(clone[i]);   
                                               break;
                                           }
                                       }

                                });
                            });
           
                    
                    };
          };
          
          function edit(element,$scope){
              console.log($scope);
              $scope.form = angular.copy($scope.term);
              element.html('\
            <form  name="editTerm{{form.ID}}"  ng-submit="submit()" >\
                <input type="text"  required="required"  ng-model=" form.name">\
                <input type="submit" >\
            </form>\
            <div ng-click="read()">close</div>');
              $compile(element.contents())($scope);
          }
           function read(element,$scope){
                   element.html("<div >Lecture : {{ term.name }}<div><div ng-click='edit()'>edit</div>");
                   $compile(element.contents())($scope);
          }
          
          function link($scope, element, attrs) {
            
             read(element,$scope);
       
             $scope.submit=function(){
                    $scope.term=$scope.form;
                    read(element,$scope);
              }

             $scope.edit=function(){
                    edit(element,$scope);
              }
             $scope.read=function(){
                    read(element,$scope);
              }
            };
    
    
}



})();
