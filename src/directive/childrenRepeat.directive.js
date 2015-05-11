/*
 * directive/childrenRepeat.js
 * This file is part of the angular directive package.
 *
 * (c) Gaetan Vigneron <gaetan@webworkshops.fr>
 *  V 0.3.0
 *  11/05/2015
 *  
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

 /**
 * #CONSTRUCT
*  @target dom {all}
 * @syntax children-repeat {attribut} 
 * @param {Json} 
 * - Require: repeat {string} 
 * - Require: in {string} 
 * - Require: track {string}
 * @exemple : [  children-repeat = "{ repeat : 'item' , in :'list', track:'children' }" ]
 *
 * #RETURN {multi-dimensional}
 * @dom: 
 * - Attribute lv[:depth] {class}   
 * @scope 
 * - Attribute [::param.repeat] {object} (scope.[::param.repeat])
 * - Attribute $[::param.repeat] {object}
 *  -- level {string} (:depth ) 
 *  -- id {string}  (:index ) 
 *  -- parent: {scope} (scope.[::param.in]:depth | controller )
 * 
 * #CUSTOM
*  @target dom.children() {all}
 * @syntax lv {attribut}  
 * exist ? use this node  : use first node
 * @param {string} ( :depth {integer} | end {string} )
 * @exemple : [ lv = "1" ,  lv = "end"   ]

 */

(function() {
    'use strict';

    angular
            .module('app')
            .directive('childrenRepeat', ChildrenRepeat);


    function ChildrenRepeat() {
        return {
            transclude: true,
            compile: compile  ,
         };  
         function compile($element, $attrs,transclude) {
                /**
                * @Define options
                */
                 var option,indexName,collectionName,scopeChildName;
                 
                try {
                    
                    if($attrs.childrenRepeat){option =   eval('(' + $attrs.childrenRepeat + ')'); };
               
                    if(option.repeat && option.track && option.in ){
                            indexName = option.repeat;
                            collectionName =option.in;
                            scopeChildName =option.track;
                    }
                }catch(e){
                     /**
                     * @Error  : Syntax or Parameter Required missing
                     */
                     console.log(e);
                     return;
                }
    
                return { pre:link};

                    function link($scope,element){       
      
                        var nodeParent = element;
                        var nodeParentName=nodeParent[0].nodeName;
 
                        /**
                        * @Observe  scope.collectionName on change
                        */
                        $scope.$watch(collectionName, function(collection) {
                             /**
                             * @Constraint  collection ?  replace dom  ( nodeParent.children ) with new collection
                             */
                            if(collection){
                               nodeParent.children().remove();
                               buildListNode(collection, nodeParent, 0);
                             };
                             
                             /**
                              * @parm collection {array}
                              * @parm parent {angular element}
                              * @parm nv  {integer} 
                              * @recursion collection :depth
                              * Create dom with scope of each index of collection
                              */
                             
                            function buildListNode(collection, parent, nv) {
                          
                                /**
                                * @Constraint  nv !=0 build container depth else use container depth as parent
                                */
                                if (nv !== 0) {
                                    var container = angular.element(document.createElement(nodeParentName));
                                    container.addClass("lv" + nv);
                                     angular.element(parent).append(container);
                                    parent = container;
                                }
                                nv++;
                                
                                /**
                                * @Define  childScope {scope}
                                */
                                for (var i = 0; i < collection.length; i++) {

                                    var childScope = $scope.$new();
                                    childScope[indexName] = collection[i];
                                    childScope["$"+indexName] = {
                                        id: i,
                                        level: nv,
                                        parent: collection
                                    };

                                     /**       
                                      *@param childscope {scope}
                                     * @callback 
                                     * - clone {angular element}
                                     * Select node model and append html element to container depth
                                     */
                                    transclude(childScope, function(clone) {
                                        
                                            /** 
                                            * @Define  haveChild
                                            */
                                           var haveChild= collection[i][scopeChildName] && collection[i][scopeChildName].length>0?true :false;
                                           
                                            /** 
                                            * @Constraint  model  ? use this node  : use first node 
                                            */
                                           
                                           var model=0;
                                           for (var j = 0; j < clone.length; j++) {
                                              
                                                if(clone[j] instanceof HTMLElement){
                                                           if(model==0)  model=j; 
                                                           if(!haveChild){
                                                                 if(clone[j].getAttribute("lv")=="end"){
                                                                     var custom=j;  
                                                                     break; 
                                                                    
                                                                 }
                                                           }
                                                          if ( clone[j].getAttribute("lv")) {
                                                                       if(clone[j].getAttribute("lv")==nv-1){
                                                                             var custom=j;  
                                                                             break;
                                                                       }  
                                                           };
                                                }
                                            }

                                            var id=  custom? custom : model;
                                        
                                            parent.append(clone[id]);
                                        
                                        /**
                                        * @Observe clone on destroy : destroy childScope
                                        */
                                        clone.on('$destroy', function() {
                                            childScope.$destroy();
                                        });
                                        
                                        /**
                                         * @Constraint  haveChild ? recursion
                                        */
                                        if (haveChild) {
                                                 buildListNode(collection[i][scopeChildName], clone[id], nv);
                                        }
                                    });
                                }
                                ;
                            }
                            ;
                          
                        }, true);
                    };
                }
      
    }
    ;


})();
