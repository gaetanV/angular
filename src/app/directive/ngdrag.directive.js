(function() {
    'use strict';
    angular
            .module('app')
            .directive('ngDrag', NgDrag);

     
   function NgDrag($compile , $parse) {
        return {
            restrict: 'A',
            transclude: true,
            template: '<span ng-transclude></span>',
            link: function($scope, element, attrs, controller, $transclude) {
                $scope.dragjs = "";
                $scope.clone = "";
                function cancel() {
                }
                ;
                function dropTo(target) {
                    if (target.getAttribute("ng-drop-action")) {

                        var fn = $parse(target.getAttribute("ng-drop-action"));
                        var callback = function() {
                            var scopeDrop = angular.element(target).scope();
                            scopeDrop.ngCall = $scope;
                            fn(scopeDrop, {$event: target});
                        };
                        $scope.$apply(callback);
                    } else {
                        var cloneElement = angular.element(element[0].cloneNode(false));
                        var callback = $transclude(function(clone) {
                            cloneElement.append(clone);
                            cloneElement = $compile(cloneElement)($scope);
                            angular.element(target).append(cloneElement);
                        });
                        $scope.$apply(callback);
                    }
                    if (attrs.ngDragAction) {
                        var fn = $parse(attrs.ngDragAction);
                        var callback = function() {
                            fn($scope, {$event: target});
                        };

                        $scope.$apply(callback);
                    }
                };

                element.on('mousedown', mousedown);


                function mousedown(e) {


                    new drag(e, attrs.ngDrag);

                    return false;
                }
                ;

                function drag(e, ID) {
                    var eDom = e.currentTarget;
                    var clone = eDom.cloneNode(true);
                    var _x = -(eDom.offsetLeft - e.pageX);
                    var _y = -(eDom.offsetTop - e.pageY);

                    var element = document.createElement("div");
                    element.appendChild(clone);
                    element.style.width = eDom.offsetWidth + "px";
                    element.style.position = "fixed";
                    element.style.opacity = "1";
                    element.style.cursor = "move";
                    var drop = initDrop();
                    var haveMove = false;
                    var overDrop;
                    move(e);

                    document.body.appendChild(element);


                    function initDrop() {
                        var drop = document.querySelectorAll("[ng-drop='" + ID + "']");
                        for (var i = 0; i < drop.length; i++) {
                             angular.element(drop[i]).addClass("ng-drop");
                        }
                        return drop;
                    }

                    function endDrop() {
                        for (var i = 0; i < drop.length; i++) {
                           angular.element( drop[i]).removeClass("ng-drop");
                            angular.element(drop[i]).removeClass("ng-drop-active");
                        }
                    }

                    var checkTimer = setInterval(function check() {
                        haveMove = haveMove ? false : true;
                    }, 50);

                    function checkPosition(e) {
                        var x = e.clientX + window.pageXOffset;
                        var y = e.clientY + window.pageYOffset;
                        if (overDrop) {
                            angular.element(overDrop).removeClass("ng-drop-active");
                            overDrop = false;
                        }
                        for (var i = 0; i < drop.length; i++) {

                            if (x > drop[i].offsetLeft && x < (drop[i].offsetWidth + drop[i].offsetLeft) && y > drop[i].offsetTop && y < (drop[i].offsetTop + drop[i].offsetHeight)) {
                                if (overDrop !== drop[i]) {

                                     angular.element(drop[i]).addClass("ng-drop-active");
                                    overDrop = drop[i];
                                    return drop[i];
                                } else {
                                    return false;
                                }
                            }
                        }

                        return false;
                    }

                    function end(e) {
                        if (overDrop) {
                            dropTo(overDrop);
                        } else {
                            cancel();
                        }
                        document.removeEventListener('mousedown', block);
                        document.removeEventListener('mouseup', end);
                        document.removeEventListener('mousemove', move);
                        document.body.removeChild(element);
                        clearInterval(checkTimer)
                        endDrop();
                    }

                    function move(e) {
                        if (!haveMove) {
                            haveMove = true;
                            checkPosition(e);
                        }
                        element.style.left = (e.clientX - _x) + "px";
                        element.style.top = (e.clientY - _y) + "px";
                        return false;
                    }
                    ;
                    function block(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    ;
                    document.addEventListener('mousedown', block);
                    document.addEventListener('mousemove', move);
                    document.addEventListener('mouseup', end);
                }
                ;
            }
        };
    };

})();
