/*
 * directive/matchField.directive.js
 * This file is part of the angular directive package.
 *
 * (c) Gaetan Vigneron <gaetan@webworkshops.fr>
 *  V 0.2.0
 *  13/05/2015
 *  
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * #CONSTRUCT
 * 
 *  @target dom {select}
 *  @syntax  match-field {attribut}  
 *      ng-model {entity}  reference
 *  @Require : ng-model {attribut}  
 *  @exemple : [    match-field= "user.pass" ]
 *   
* # RESULT 
 * 
 * ##  Form 
 * $validators.match {intger}
 * @exemple : [ form.passCtr.$error.match ]
 *
 */


(function() {
    'use strict';
    angular
            .module('app')
            .directive('matchField', MatchField);

    function MatchField() {
         return {
             require: '?ngModel',
              link:link
         };  
         function link(scope, elem, attrs, ctrl){
              var field = attrs.matchField;
              var match;
              /**
             * @Error requiere ng-model
             */
              if (!ctrl) return;
              /**
             * @Injection match validation
             */
              ctrl.$validators.match=function(modelValue, viewValue){
                       return modelValue===match || false;
              }
             /**
             * @Observe  ng-model (field) change
             */
              scope.$watch(field,
              function(val){
                   match=val;   
                   ctrl.$validate();
                }
               );
         }; 
    };
    
})();
