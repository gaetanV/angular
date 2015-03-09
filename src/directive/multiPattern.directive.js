(function() {
    'use strict';
    angular
            .module('app')
            .directive('multiPattern', MultiPattern);

    function MultiPattern() {
         return {
             require: '?ngModel',
              link:link
         };  
         function link(scope, elem, attrs, ctrl){
              if (!ctrl) return;
              attrs=JSON.parse(attrs.multiPattern);
              for(var func in attrs){
                         var patternExp = attrs[func];
                         if (typeof (patternExp)=="string" && patternExp.length > 0) {
                             var regex = new RegExp('^' + patternExp + '$');
                           };
                           
                           if(!regex.test){
                                throw new Error('Expected '+patternExp+' to be a RegExp' );
                           };
                       validator(regex);
              }
              
              function validator(regex){
                   ctrl.$validators[func] = function(value) {
                          return  regex.test(value);
                    };
              };
               ctrl.$validate();
         }; 
    };
    
})();
