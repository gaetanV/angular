(function () {
    'use strict';

    angular
            .module('app')
            .config(route);

    route.$inject = ['$routeProvider','$locationProvider'];

    function route($routeProvider,$locationProvider) {
        
        $locationProvider.hashPrefix('');
        $routeProvider
        .when('/', {
            templateUrl: './app/index.html',
        }).when('/childrenrepeat', {
            template: '<page-childrenrepeat></page-childrenrepeat>'
        }).when('/childrenDrop', {
            template: '<page-childrendrop></page-childrendrop>'
        }).when('/childrenOption', {
            template: '<page-childrenoption></page-childrenoption>'
        }).when('/ngdrag', {
            templateUrl: './app/ngdrag/ngdrag.html',
        }).when('/ngdragclone', {
            templateUrl: './app/ngdrag/ngclone.html',
        })
        .when('/quickedit', {
            templateUrl: './app/quickedit/quickedit.html',
        })
        .when('/matchfield', {
            templateUrl: './app/matchfield/matchfield.html',
        }).when('/multipattern', {
            templateUrl: './app/matchfield/multipattern.html',
        }).when('/dropfiles', {
            templateUrl: './app/dropfiles/dropfiles.html',
        }).when('/finder', {
            templateUrl: './app/finder/finder.html',
        }).when('/datePicker', {
            templateUrl: './app/date/datePicker.html',
        }).when('/initValue', {
            templateUrl: './app/form/initValue.html',
        }).when('/gitRepro', {
            templateUrl: './app/getcode/gitrepro.html',
        }).when('/code', {
            templateUrl: './app/getcode/code.html',
        }).when('/ckeditor', {
            templateUrl: './app/form/ckeditor.html',
        });
    }
})();