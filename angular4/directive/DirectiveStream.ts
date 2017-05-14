export function Stream(a) {
    if (!a.cible) {throw Error("need a cible")};
    if (!a.stream) {throw Error("need a stream")};
    return function (constructor: Function) {
        constructor.prototype[a.cible] = function (message) {
           var event = new CustomEvent(a.stream, {'detail': {message: message, }});
           document.dispatchEvent(event);
        };
    }
}
export function Observe(a) {
    if (!a.cible) {throw Error("need a cible")};
    if (!a.stream) {throw Error("need a stream")};
    return function (constructor: Function) {
        a.cible.forEach(b => constructor.prototype[b] = "--");
        constructor.prototype["ngStream" + a.stream] = function (message) {
            a.cible.forEach(b => constructor.prototype[b] = message.detail.message);
        }
        document.addEventListener(a.stream,  constructor.prototype["ngStream" + a.stream], false);
    }
}