angular.module('service-default',  []);
 
function Service(param: {module: string, provider: Array<string>}) {
    
    return function (a: Function) {
        angular.module(param.module ? param.module :'service-default').service(a.name, (param.provider ? param.provider : []).concat(<any>[a]));
    };
  
}

