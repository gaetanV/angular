import {Component,Inject } from '@angular/core';
import {InterfaceStream} from '../../../interface/InterfaceStream';

@Component({
    selector: 'directive-Observable-Test',
    template: `
        <div>{{message}}</div>
    `,
    providers: [InterfaceStream]
})
export class DirectiveObservableComponentTest {
    message: string = "wait your click";
    instance: number ;
    constructor(
        @Inject(InterfaceStream) private interfaceStream: InterfaceStream,
    ) {
         this.message = this.interfaceStream.subscribe(this);
    }

    ngStream(message) {
        this.message = message;
    }

}

@Component({
    selector: 'directive-Observable',
    template: `
        <directive-Observable-Test></directive-Observable-Test>
        <directive-Observable-Test></directive-Observable-Test>
        <div (click)="stream('observer')">Click</div>
    `,
    providers: [InterfaceStream]
})
export class DirectiveObservableComponent {

    constructor(
        @Inject(InterfaceStream) private interfaceStream: InterfaceStream,
    ) {}
    stream(message: string) {
        this.interfaceStream.stream("superbe" + Math.random());
    }
}