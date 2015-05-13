/*
 * directive/finderField.js
 * This file is part of the angular directive package.
 *
 * (c) Gaetan Vigneron <gaetan@webworkshops.fr>
 *  V 0.2.0
 *  11/05/2015
 *  
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * #CONSTRUCT
 * 
 *  @target dom {select}
 *  @syntax  finder-field {attribut}  
 *      Option:  {integer} | 4
 * @option  multiple {attribut} 
 *  @exemple : [   finder-field= "3" multiple ,  finder-field ]
 *
 */

(function () {
    'use strict';
    angular
            .module('app')
            .directive('finderField', FinderField);
    FinderField.$inject = ['$compile'];

    function FinderField($compile) {
        var link = function ($scope, $element, $attrs, $controller) {
            var multiple = $attrs.multiple ? true : false;


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
                        if (multiple) {
                            childScope.selectFields = new Array();
                            childScope.removeField = function (select, $index) {
                                childScope.selectFields.splice($index, 1);
                                var currentValue = $controller.$modelValue ? $controller.$modelValue : new Array();
                                currentValue.splice(currentValue.indexOf(select.value), 1);
                                childScope.finderFields.push(select);
                                $controller.$setViewValue(currentValue);
                            }


                            childScope.$watchCollection("selectFields", function (e) {

                            })
                        }


                        childScope.selectField = function (select, $index) {
                            if (multiple) {
                                var currentValue = $controller.$modelValue ? $controller.$modelValue : new Array();
                                if (currentValue.indexOf(select.value) === -1)
                                    currentValue.push(select.value);

                                childScope.finderFields.splice(childScope.finderFields.indexOf(select), 1);
                                if (currentValue.indexOf(select) === -1)
                                    childScope.selectFields.push(select);

                                $controller.$setViewValue(currentValue);
                            } else {
                                $controller.$setViewValue(select.value);
                            }
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

                        if (multiple) {
                            ulDom = document.createElement("ul");
                            liDom = document.createElement("li");
                            liDom.setAttribute("ng-repeat", "selectField in selectFields");
                            liDom.setAttribute("ng-click", "removeField(selectField,$index)");
                            var node = document.createTextNode("{{selectField.text}}");
                            liDom.appendChild(node);
                            ulDom.appendChild(liDom);
                            findDom.appendChild(ulDom);
                        }

                        ulDom = document.createElement("ul");
                        ulDom.style.display = "none";
                        liDom = document.createElement("li");

                        liDom.setAttribute("ng-repeat", "finderField in finderFields  | filter:searchText | limitTo:" + limit + "");
                        liDom.setAttribute("ng-click", "selectField(finderField,$index)");
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
