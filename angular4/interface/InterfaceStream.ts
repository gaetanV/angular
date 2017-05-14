let _message = "init";

export class InterfaceStream {
    subscribe(Component) {
        
        document.addEventListener('observable-event', (e)=> Component.ngStream.call(Component,[e.detail.message]), false);
        return _message;
    }

    stream(message: string) {
        _message = message;
        var event = new CustomEvent("observable-event", {'detail': {message: _message, }});
        document.dispatchEvent(event);
    }
}