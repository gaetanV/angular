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
 * @syntax  children-repeat 
 * @exemple children-repeat ="{repeat:item, in:list,track:children}"
 * @dom all
 * @param {Json} 
 * - Require: repeat {string} 
 * - Require: in {string} 
 * - Require: track {string}
 * 
 * #RETURN
 * @scope [param.repeat] {scope} (scope.[param.repeat])
 * @scope $[param.repeat]} 
 * - level {string} (children level ) 
 * - id {string}  (children index by level ) 
 * - parent: {scope} (scope.[param.repeat][level] | controller )
 * @dom  lv[:level] {class}   
 * 
 * #CUSTOM
 * @dom lv[?] {class} 
 * - function: ? use this node  : use first node 
 * @param
 * - level {integer}
 * - end {string} 
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
                * @Construct options
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
                        * @Observe  "collectionName"
                        */
                        $scope.$watch(collectionName, function(collection) {
                             /**
                             * @Constraint  collection {integer}  : Existe
                             * 
                             * #PROCESS
                             * @dom  nodeParent.children {dom collection} (remove)
                             * @Function buildListNode
                             */
                            if(collection){
                               nodeParent.children().remove();
                               buildListNode(collection, nodeParent, 0);
                             };
                             
                             
                             /**
                             * #PROCESS
                             *@dom  clone {collection}
                            * @scope [param.repeat] {scope} (scope.[param.repeat])
                             *@scope $[param.repeat]} 
                             * - level {string} (children level ) 
                             * - id {string}  (children index by level ) 
                             * - parent: {scope} (scope.[param.repeat][level] | controller )
                             * @dom  lv[:level] {class}  
                              */
                            function buildListNode(collection, parent, nv) {
                          
                                /**
                                * @Constraint  nv {integer}: Not First Level 
                                * 
                                * #PROCESS
                                * @dom container { nodeParentName {string} }
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
                                     * #PROCESS                              
                                     * @transclude  childScope{scope}
                                     * @dom  clone {dom collection}
                                     */
                                    transclude(childScope, function(clone) {
                                        
                                            /** 
                                            * @Define  haveChild
                                            */
                                           var haveChild= collection[i][scopeChildName] && collection[i][scopeChildName].length>0?true :false;
                                           
                                            /** 
                                            * @Constraint  model  ? use this node  : use first node 
                                            * @dom dom lv[?] {class} 
                                            * @param
                                            * - level {integer}
                                            * - end {string} 
                                            *   
                                            * #PROCESS
                                            * @dom  clone {collection}
                                            * 
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
                                        * @Observe clone {dom} : destroy
                                        * 
                                        * #PROCESS
                                        * @Destroy childScope {scope}
                                        */
                                        clone.on('$destroy', function() {
                                            childScope.$destroy();
                                        });
                                        
                                        /**
                                         * @Constraint  haveChild {boolean} : true
                                         * 
                                         * #PROCESS
                                         * @recursion buildListNode {function}
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
