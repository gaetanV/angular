/*
 * directive/ckeditor.directive.js
 *
 * (c) Gaetan Vigneron
 *  11/05/2015
 *
 * This directive require CKEDITOR library
 */

angular.module('gaetan').directive('ckeditor', [
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: link,
    };

    //////////

    function link($scope, $element, $attrs, $controller) {
      var instance;
      var element;
      var ck;
      var editor;

      if (CKEDITOR) {
        element = new CKEDITOR.dom.element($element[0]);
        editor = element.getEditor();

        if (editor) {
          instance = CKEDITOR.instances[editor.name];
          if (instance) CKEDITOR.destroy(instance);
        }

        ck = CKEDITOR.replace($element[0]);

        ck.on('pasteState', function () {
          $scope.$apply(function () {
            $controller.$setViewValue(ck.getData());
          });
        });

        $controller.$render = function () {
          ck.setData($controller.$modelValue);
        };
      }
    }
  },
]);
