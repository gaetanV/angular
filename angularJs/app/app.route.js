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
            template: '<children-repeat/>'
        }).when('/childrenDrop', {
            template: '<children-drop/>'
        }).when('/childrenOption', {
            template: '<children-option/>'
        }).when('/datePicker', {
            template: '<page-datepicker/>',
        }).when('/ngdrag', {
            template: '<ng-drag/>',
        }).when('/ngdragclone', {
            template: '<ng-clone/>',
        }).when('/quickedit', {
            template: '<quickedit/>',
        }).when('/matchfield', {
            template: '<matchfield/>',
        }).when('/multipattern', {
            template: '<multipattern/>',
        }).when('/dropfiles', {
            template: '<drop-files/>',
        }).when('/finder', {
            template: '<finder></finder>',
        }).when('/initValue', {
            template: '<init-value/>',
        }).when('/gitRepro', {
            template: '<get-git/>',
        }).when('/code', {
            template: '<get-code/>',
        }).when('/ckeditor', {
            template: '<ckeditor/>',
        });
    }
})();