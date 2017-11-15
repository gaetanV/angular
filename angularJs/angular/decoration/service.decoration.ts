angular.module('service-default', []);

function Service(param: { module: string, provider: Array<string> }) {
    return function (a: any) {
        angular.module(param.module ? param.module : 'service-default').service(a.name, (param.provider ? param.provider : []).concat([a] as any));
    };
}
