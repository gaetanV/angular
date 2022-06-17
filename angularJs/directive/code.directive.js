/*
 * directive/code.directive.js
 *
 * (c) Gaetan Vigneron
 *  11/05/2015
 *
 * This directive require Prism library
 */

angular.module('gaetan').directive('code', [
  '$http',
  function ($http) {
    return {
      restrict: 'A',
      transclude: true,
      compile: compile,
    };

    //////////

    function compile($element, $attrs) {
      var preDom;

      return {
        pre: preLink,
      };

      //////////

      function preLink() {
        if (Prism) {
          $http.get($attrs.code).then(successCallback, errorCallback);
        }
      }

      function successCallback(response) {
        preDom = document.createElement('PRE');
        preDom.innerHTML = response.data;
        preDom.className = 'language-javascript';
        $element.append(preDom);
        Prism.highlightElement(preDom);
      }

      function errorCallback(e) {
        console.log('wrong url');
      }
    }
  },
]);
