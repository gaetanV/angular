(function () {
    'use strict';
    angular
            .module('app')
            .directive('multiPattern', MultiPattern);

    function MultiPattern() {
        return {
            require: '?ngModel',
            link: link
        };
        function link(scope, elem, attrs, ctrl) {
            if (!ctrl)
                return;
            //V1 attrs=JSON.parse(attrs.multiPattern);
            attrs = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(attrs.multiPattern.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + attrs.multiPattern + ')');
            for (var func in attrs) {
                var patternExp = attrs[func];
                if (typeof (patternExp) == "string" && patternExp.length > 0) {
                    try {
                        var regex = new RegExp(patternExp);
                    } catch (e) {
                        throw new Error('Expected ' + patternExp + ' is not a valid RegExp');
                    }
                }
                ;
                if (!regex.test) {
                    throw new Error('Expected ' + patternExp + ' to be a RegExp');
                } ;
                validator(regex);
            }

            function validator(regex) {
                ctrl.$validators[func] = function (value) {
                    return  regex.test(value);
                };
            }
            ;
            ctrl.$validate();
        }
        ;
    }
    ;

})();
