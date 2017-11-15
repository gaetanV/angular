/*
 * directive/matchField.directive.js
 *
 * (c) Gaetan Vigneron 
 *  11/05/2015
 */

angular.module('gaetan').directive('matchField', [function () {
        
    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };

    //////////

    function link($scope, $element, $attrs, $controller) {

        var field = $attrs.matchField;
        var match;
        
        $scope.$watch(field,onModelChange);
        
        /**
         * @Error requiere ng-model
         */
        if (!$controller)
            return;

        /**
         * @Injection match validation
         */
        $controller.$validators.match = function (modelValue) {
            return modelValue === match || false;
        };

        /**
         * @Observe  ng-model (field) change
         */
        function onModelChange(val) {
              match = val;
              $controller.$validate();
        }



    }      
}]);