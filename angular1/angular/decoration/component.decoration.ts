angular.module('component-default', []);

function Component(param: {selector: string, module: string, template: string, provider: Array<string>}) {

    if (!param.selector) {
        throw "you need a selector";
    }
    var selector = "";
    var r = param.selector.split("-");
    selector = r[0];
    for (var i = 1; i < r.length; i++) {
        selector += r[i].charAt(0).toUpperCase() + r[i].slice(1);
    }

    return function (a: Function) {
        
        angular.module(param.module ? param.module : 'component-default').component(selector, {
            template: param.template ? param.template : "",
            controller: (param.provider ? param.provider : []).concat(<any>[a])
        });
    };
}
