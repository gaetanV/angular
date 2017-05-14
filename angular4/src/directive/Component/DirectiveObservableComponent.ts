import {Component, Inject} from '@angular/core';
import {Stream, Observe} from '../../../directive/DirectiveStream';

@Component({
    selector: 'directive-Observable-Test',
    template: `
       <section> 
        -- Test --
         <div>{{message}}</div>
         <div>{{test}}</div>
       </section>
    `
})
@Observe({
    stream: "observable-event",
    cible: ['message', 'test']
})
export class DirectiveObservableComponentTest {}

@Component({
    selector: 'directive-Observable',
    template: `
        <directive-Observable-Test></directive-Observable-Test>
        <directive-Observable-Test></directive-Observable-Test>
        <div (click)="upstep('observer ')">Click</div>
    `
})
@Stream({
    stream: "observable-event",
    cible: 'ngStream'
})
export class DirectiveObservableComponent {
    upstep(message: string) {
        this.ngStream(message + Math.random()); // Warning math random is interpret for all client
    }
}