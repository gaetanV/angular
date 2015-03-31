(function() {
    'use strict';

     angular
            .module('app')
            .config(route);

   route.$inject = ['$routeProvider'];
   
    function route($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : './app/index.html',
            }).when('/childrenrepeat', {
                templateUrl : './app/childrenrepeat/childrenrepeat.html',
            }).when('/ngdrag', {
               templateUrl : './app/ngdrag/ngdrag.html',
            }).when('/ngdragclone', {
               templateUrl : './app/ngdrag/ngclone.html',
            })
            .when('/quickedit', {
               templateUrl : './app/quickedit/quickedit.html',
            })
            .when('/matchfield', {
               templateUrl : './app/matchfield/matchfield.html',
            }) .when('/multipattern', {
               templateUrl : './app/matchfield/multipattern.html',
            }).when('/dropfiles', {
               templateUrl : './app/dropfiles/dropfiles.html',
            })
            ;
    };



})();