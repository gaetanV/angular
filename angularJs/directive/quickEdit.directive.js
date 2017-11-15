/*
 * directive/quickEdit.directive.js
 *
 * (c) Gaetan Vigneron 
 *  11/05/2015
 */

angular.module('gaetan').directive('quickEdit', [function () {
                
    return {
        restrict: 'A',
        transclude: true,
        compile: compile,
    };
    
    //////////
    
    function compile($element, $attr, transclude) {

        return {
            pre: link
        };
        
        //////////
        
        function link($scope, $element) {
            
            var attAction;
            var model;
            
            $scope.quickModel = $attr.quickEdit;
            $scope.switchModel = switchModel;
            $scope.$watch("quickModel", onModelChange);
            
            function switchModel(id) {
                $scope.quickModel = id; 
            }
                    
            function onModelChange(m) {
                model = m;
                transclude($scope, transcludeHtml);
            };
            
            function transcludeHtml(clone) {
                for (var i = 0; i < clone.length; i++) {
                    if (clone[i].toString() === "[object HTMLDivElement]"){
                        if (clone[i].getAttribute("quick-model") === model) {
                            $element.children().remove();
                            attAction = clone[i].getAttribute("quick-action");
                            if (attAction) {
                                $scope[attAction]($scope);
                            }
                            $element.append(clone[i]);
                            break;
                        }
                    }
                }
            };
        }
    }
        
}]);
