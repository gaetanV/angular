(function () {
    'use strict';

    angular
            .module('app')
            .directive('quickEdit', QuickEdit);

    QuickEdit.$inject = ["$compile"];
    function QuickEdit($compile) {

        return {
            transclude: true,
            compile: compile,
        };

        function compile($element, $attr, transclude) {

            return {pre: link};
            function link($scope, element) {
                $scope.model = $attr.quickEdit;
                $scope.switch = function (id) {
                    $scope.model = id;

                }
                $scope.$watch("model", function (model) {
                    transclude($scope, function (clone) {
                        for (var i = 0; i < clone.length; i++) {
                            if (clone[i].id === model) {

                                element.children().remove();
                                var att = clone[i].getAttribute("quick-action");
                                if (att) {
                                    $scope[att]($scope);
                                }
                                ;

                                element.append(clone[i]);
                                break;
                            }
                        }

                    });
                });


            }
            ;
        }
        ;

    }

})();
