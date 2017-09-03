/*
 * directive/initValue.directive.js
 *
 * (c) Gaetan Vigneron 
 *  11/05/2015
 */

angular.module('gaetan').directive('initValue', [function () {
        
    return {
        restrict: 'A',
        require: "ngModel",
        link: link
    };

    function link($scope, $element, $attrs, $controller) {
        $controller.$setViewValue($element[0].value);
        $controller.$render();
    }
        
        
}]);