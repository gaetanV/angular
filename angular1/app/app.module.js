(function () {
    'use strict';

    angular.module('app', [
        //System
        'ngRoute',
        //Component
        'gaetan',
        'component-rest',
        'component',
        'component-factory',
    ]);
    


    angular.module('component-rest', ['service-rest']);
    angular.module('component', []);
    angular.module('component-factory', ['app.factory'])

})();



