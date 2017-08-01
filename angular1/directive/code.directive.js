(function () {
    'use strict';
    angular
            .module('app')
            .directive('code', Code);

    Code.$inject = ["$compile", "$http", "$location"];
    function Code($compile, $http, $location) {
        return {
            transclude: true,
            compile: compile,

        };
        function compile($element, $attrs, transclude) {


            return {
                pre: preLink
            }

            function preLink() {

                var url = $attrs.code


                $http.get(url).then(successCallback, errorCallback);
                function successCallback(response) {
                    var str = response.data;
                    var pre = document.createElement("PRE")
                    pre.innerHTML = str;
                    pre.className = "language-javascript"
                    $element.append(pre);
                    Prism.highlightElement(pre);
                }

                function errorCallback(e) {
                    console.log("wrong url");
                }
            }
        }
    }

})();
