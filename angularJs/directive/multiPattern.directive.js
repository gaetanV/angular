/*
 * directive/multiPattern.directive.js
 *
 * (c) Gaetan Vigneron
 *  11/05/2015
 */

angular.module('gaetan').directive('multiPattern', [
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: link,
    };

    function link($scope, $element, $attrs, $controller) {
      var tmpPatternExp;
      var attrs =
        !/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
          $attrs.multiPattern.replace(/"(\\.|[^"\\])*"/g, '')
        ) && eval('(' + $attrs.multiPattern + ')');

      for (var func in attrs) {
        tmpPatternExp = attrs[func];

        if (typeof tmpPatternExp === 'string' && tmpPatternExp.length > 0) {
          try {
            var regex = new RegExp(tmpPatternExp);
          } catch (e) {
            throw new Error(
              'Expected ' + tmpPatternExp + ' is not a valid RegExp'
            );
          }
        }

        if (!regex.test) {
          throw new Error('Expected ' + tmpPatternExp + ' to be a RegExp');
        }

        /**
         * @Injection match validation
         */
        validator(regex);
      }

      function validator(regex) {
        $controller.$validators[func] = function (value) {
          return regex.test(value);
        };
      }

      $controller.$validate();
    }
  },
]);
