(function() {
    'use strict';

    angular.module('app', [
        //System
        'ngRoute',
        //Component
        'gaetan',
        'component-rest',
        'component',
        'component-factory'
    ]);
    angular.module('component-rest', ['app.rest']);
    angular.module('component', []);
    angular.module('component-factory',['app.factory'])
    
})();