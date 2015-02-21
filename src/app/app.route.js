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
            });
    };



})();