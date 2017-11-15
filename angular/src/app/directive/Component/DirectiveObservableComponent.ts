import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {Stream, Observe} from '@directive/DirectiveStream';

@Component({
    selector: 'directive-observable-test',
    template: `
       <section>
         <div *ngFor="let bloc of message  ">
            <p>{{bloc}}<p>
         </div>
       </section>
    `
})
@Observe({
    stream: 'observable-event',
    cible: ['message'],
    history: 4,
})
export class DirectiveObservableComponentTest {}
@Component({
    selector: 'directive-observable-test2',
    template: `
       <p> >>>> {{message}}  <<<<<<p>
    `
})
@Observe({
    stream: 'observable-event',
    cible: ['message'],
})
export class DirectiveObservableComponentTest2 {}


@Component({
    selector: 'app-directive-observable',
    template: `
        <div>Browser</div>
        <span observe="observable-event"  model="test"  ></span>
        <input #input  [(ngModel)]="name" >
        <div (click)="upstep()">Chat</div>
        <<<< {{test}} >>>>>
        <directive-observable-test2></directive-observable-test2>
        <directive-observable-test></directive-observable-test>
    `
})
@Stream({
    stream: 'observable-event',
    cible: 'ngStream',
})
export class DirectiveObservableComponent {
    @ViewChild('input', { read: ViewContainerRef }) public input: ViewContainerRef;

    ngStream: (string) => void;
    test = '';
    name = '';
    upstep() {
        this.name = this.input.element.nativeElement.value;
        this.ngStream(this.name);
        // Warning  (Math.random()) is interpret for all client
    }


}
