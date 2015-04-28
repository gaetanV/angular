(function () {
    'use strict';
    angular
            .module('app')
            .directive('finderField', FinderField);
    FinderField.$inject = ['$compile'];

    function FinderField($compile) {
        var link = function ($scope, $element, $attrs, $controller) {

            if ($element[0].nodeName == "SELECT") {
                var options = $element.find("option");
                if (options.length > 0) {

                    $element.css('display', 'none');   // Hide
                    var limit = parseInt($attrs.finderField) ? parseInt($attrs.finderField) : 4;
                    var findDom, inputDom, ulDom, liDom;
                    var childScope = $scope.$new();
                    
                    var initScope = function () {
                        var finder = Array();
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].selected) {
                                childScope.curentModel = options[i].text;
                            }
                            finder.push({value: options[i].value, text: options[i].text, element: options[i]});
                        }
                        childScope.searchText = {};
                        childScope.searchText.text = childScope.curentModel;

                        childScope.finderFields = finder;

                        childScope.selectField = function (select) {
                            $controller.$setViewValue(select.value);
                            childScope.curentModel = select.text;
                            inputDom.value = childScope.curentModel;
                            ulDom.style.display = "none";
                            // (hide) NOT REQUIRED    $controller.$render(); 
                        };

                    }


                    var initDom = function () {
                        findDom = document.createElement("div");
                        inputDom = document.createElement("input");

                        inputDom.setAttribute("ng-model", "searchText.text");

                        ulDom = document.createElement("ul");
                        ulDom.style.display = "none";
                        liDom = document.createElement("li");

                        liDom.setAttribute("ng-repeat", "finderField in finderFields  | filter:searchText | limitTo:" + limit + "");
                        liDom.setAttribute("ng-click", "selectField(finderField)");
                        var node = document.createTextNode("{{finderField.text}}");

                        liDom.appendChild(node);
                        ulDom.appendChild(liDom);
                        findDom.appendChild(inputDom);
                        findDom.appendChild(ulDom);

                        $compile(findDom)(childScope);

                        $element.after(findDom);
                        angular.element(findDom).on('$destroy', function () {
                            childScope.$destroy();
                        });
                        
                        var hide = function (e) {
                            e.stopPropagation();
                            if (e.target == inputDom || e.target.parentNode == ulDom) {
                                return false;
                            }
                            ulDom.style.display = "none";
                            inputDom.value = childScope.curentModel;
                            document.removeEventListener('mousedown', hide);
                        }

                        var show = function (e) {
                            ulDom.style.display = "block";
                            document.addEventListener('mousedown', hide);
                            e.stopPropagation();
                        }

                        inputDom.addEventListener('click', show, false);
                    }


                    initScope();
                    initDom();

                }
                else {
                    throw "Node SELECT must contain at less one option ";
                    return;
                }
            } else {
                throw "Node must be of type SELECT";
                return;
            }

        }
        return {
            restrict: 'A',
            require: "ngModel",
            link: link
        };

    }
    ;

})();
