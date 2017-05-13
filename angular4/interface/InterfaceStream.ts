import {DirectiveObservableComponentTest} from './../src/directive/Component/DirectiveObservableComponent';
let sub = [];
let cmp = 0;
let _message = "init";
export class InterfaceStream {

    subscribe(Component) {
        //More integrity
        if (Component instanceof DirectiveObservableComponentTest) {
            if (++cmp > 1000) {
                cmp = 0;
            }
            sub.push({id: cmp, func: Component.ngStream.bind(Component)});
            Component.ngStream.bind(Component)(_message);
            return cmp;
        } else {
            throw Error("observer violation");
        }
    }
    unsubscribe(instance) {
        var i = sub.findIndex((a) => {return a.id == instance});
        if (i != -1) {
            sub.splice(i, 1);
        }
    }
    stream(message: string) {
        _message = message;
        for (var i in sub) {
            sub[i].func(_message);
        }

    }
}