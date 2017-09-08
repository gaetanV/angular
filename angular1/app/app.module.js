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

function Component(param) {
    
    if(!param.selector){
        throw "you need a selector";
    }
    var selector = "";
    var r = param.selector.split("-");
    selector=r[0];
    for(var i = 1 ; i<r.length;  i++){
        selector += r[i].charAt(0).toUpperCase()+ r[i].slice(1);
    }
 
    return function(a) {
         angular.module(param.module?param.module:'component').component(selector, {
            template:param.template?param.template:"",
            controller:(param.provider?param.provider:[]).concat([a])
        });
    };
    

}