angular.module('component-default', []);

function Component(param: {
  selector: string;
  module: string;
  template: string;
  provider: Array<string>;
}) {
  if (!param.selector) {
    throw new Error('you need a selector');
  }
  let selector = '';
  const r = param.selector.split('-');
  selector = r[0];
  for (let i = 1; i < r.length; i++) {
    selector += r[i].charAt(0).toUpperCase() + r[i].slice(1);
  }

  return function (a: any) {
    angular
      .module(param.module ? param.module : 'component-default')
      .component(selector, {
        controller: (param.provider ? param.provider : []).concat([a] as any),
        template: param.template ? param.template : '',
      });
  };
}
