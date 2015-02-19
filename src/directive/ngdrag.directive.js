(function() {
    'use strict';
    angular
            .module('app')
            .directive('ngDrag', NgDrag);

    NgDrag.$inject = ["$compile", "$parse"];

    function NgDrag($compile, $parse) {
        return {
            restrict: 'A',
            transclude: true,
            template: '<span ng-transclude></span>',
            link:link
        };           
     
      function link($scope, element, attrs,module,$transclude) {
     
                element.on('mousedown', mousedown);
                function mousedown(e) {
                    new drag(e, attrs.ngDrag, dropTo);
                    //attrs.ngDrag AS ID GROUP//
                    return false;
                };
                /**
                 * call back
                 **/
                var dropTo = function(target) {
                    var actionDrop = target.getAttribute("ng-drop-action");
                    var actionDrag = attrs.ngDragAction;
                    
                    if (actionDrop) { //IF ACTION DROP
                        parseAction(actionDrop,target,"drop");
                    } else {  //IF NOT ACTION DROP CLONE
                         clone(target);
                    }
                    if (actionDrag) { //IF ACTION DRAG
                        parseAction(actionDrag,target,"drag");
                    };
                };
                
                function clone(target){
                        var cloneElement = angular.element(element[0].cloneNode(false));
                        var callback = $transclude(function(clone) {
                            cloneElement.append(clone);
                            cloneElement = $compile(cloneElement)($scope);
                            angular.element(target).append(cloneElement);
                        });
                        $scope.$apply(callback);
                };
                
                function parseAction(action,target,type){
                   var fn = $parse(action);
                        var callback = function() {
                            var scopeDrop = angular.element(target).scope();
                           switch(type){
                               case "drop":
                                   scopeDrop.ngCall = $scope;
                                    fn(scopeDrop, {$event: target});
                                   break;
                               case "drag":
                               default:
                                    fn($scope, {$event: target});
                                   break;
                           }
                        
                     };
                    $scope.$apply(callback);
                };

            };
    } ;


    var drag = function(e, idGroup, callback) {
        var vm = this;
        var dom = e.currentTarget;
        
        vm._xClick = -(dom.offsetLeft - e.pageX);
        vm._yClick = -(dom.offsetTop - e.pageY);
        vm.haveMove = false;
        
        vm.ngdropList = vm.initDropList(idGroup);
        vm.dropTo = callback;

        vm.cloneDom = vm.clone(dom); //Dom move

        vm.move(e);
        vm.overDrop; //Dom target

        vm.checkTimer = setInterval(function check() {
            if (vm.haveMove)
                vm.haveMove = false;
        }, 50); // restrict calls to checkPosition
        //
        ///EVENTS///
        vm.handleEvent = function(e) {
            switch (e.type) {
                case 'mousedown':
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                case 'mousemove':
                    this.move(e);
                    break;
                case 'mouseup':
                    this.end(e);
                    break;
            }
        };
        document.addEventListener('mousedown', vm);
        document.addEventListener('mousemove', vm);
        document.addEventListener('mouseup', vm);
    };


    drag.prototype.end = function(e) {
        document.body.removeChild(this.cloneDom);
        this.removeDropList();
        document.removeEventListener('mousedown', this);
        document.removeEventListener('mouseup', this);
        document.removeEventListener('mousemove', this);
        clearInterval(this.checkTimer)
        if (this.overDrop) {
            this.dropTo(this.overDrop);
        };
  };


    drag.prototype.clone = function(dom) {
        var element = document.createElement("div");
        element.appendChild(dom.cloneNode(true));
        element.style.width = dom.offsetWidth + "px";
        element.style.position = "fixed";
        element.style.opacity = "1";
        element.style.cursor = "move";
        document.body.appendChild(element);
        return element;
    };


    drag.prototype.checkPosition = function(e) {
        var drop = this.ngdropList;
        var x = e.clientX + window.pageXOffset;
        var y = e.clientY + window.pageYOffset;
        if (this.overDrop) {
            angular.element(this.overDrop).removeClass("ng-drop-active");
            this.overDrop = false;
        }
        for (var i = 0; i < drop.length; i++) {

            if (x > drop[i].offsetLeft && x < (drop[i].offsetWidth + drop[i].offsetLeft) && y > drop[i].offsetTop && y < (drop[i].offsetTop + drop[i].offsetHeight)) {
                if (this.overDrop !== drop[i]) {
                    angular.element(drop[i]).addClass("ng-drop-active");
                    this.overDrop = drop[i];

                    return drop[i];
                } else {
                    return false;
                }
            }
        }

        return false;
    }

    drag.prototype.move = function(e) {
        if (!this.haveMove) {
            this.haveMove = true;
            this.checkPosition(e);
        }
        this.cloneDom.style.left = (e.clientX - this._xClick) + "px";
        this.cloneDom.style.top = (e.clientY - this._yClick) + "px";
    };


    drag.prototype.initDropList = function(idGroup) {
        var ngdropList = document.querySelectorAll("[ng-drop='" + idGroup + "']");
        for (var i = 0; i < ngdropList.length; i++) {
            angular.element(ngdropList[i]).addClass("ng-drop");
        }
        ;
        return  ngdropList;
    };

    drag.prototype.removeDropList = function() {
        for (var i = 0; i < this.ngdropList.length; i++) {
            angular.element(this.ngdropList[i]).removeClass("ng-drop");
            angular.element(this.ngdropList[i]).removeClass("ng-drop-active");
        };
        this.ngdropList = [];
    }
})();
