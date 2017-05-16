import {Directive, ElementRef, Inject, Input, Output, EventEmitter, ViewContainerRef} from '@angular/core';
@Directive({selector: '[observe]'})

export class DirectiveStream {
    @Input() observe: string;
    @Input() model: string;
    
    constructor( 
        @Inject(ElementRef) private el: ElementRef, 
        @Inject(ViewContainerRef) private c: ViewContainerRef
    ) {}
    ngOnInit() {document.addEventListener(this.observe, this.update.bind(this)), false)}
    update(message) {
        if(this.model){
            this.c._view.component[this.model]= message.detail.message;
        }
        this.el.nativeElement.innerHTML = message.detail.message;
    }
}


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
        if (a.history) {
            a.cible.forEach(b => constructor.prototype[b] = []);

            if (a.history == true) {
                constructor.prototype["ngStream" + a.stream] = function (message) {
                    a.cible.forEach(b => {constructor.prototype[b].unshift(message.detail.message)});
                }
            } else {
                if (a.history > 0) {
                    constructor.prototype["ngStream" + a.stream] = function (message) {
                        a.cible.forEach(b => {
                            constructor.prototype[b].unshift(message.detail.message);
                            if (constructor.prototype[b].length > a.history) {
                                constructor.prototype[b].pop();
                            }

                        });
                    }
                }
            }
        } else {
            a.cible.forEach(b => constructor.prototype[b] = "");
            constructor.prototype["ngStream" + a.stream] = function (message) {
                a.cible.forEach(b => {constructor.prototype[b] = message.detail.message});
            }
        }
        document.addEventListener(a.stream, constructor.prototype["ngStream" + a.stream], false);
    }
}

