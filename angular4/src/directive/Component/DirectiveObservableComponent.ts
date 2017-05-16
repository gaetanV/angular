import {Component,Inject,NgZone,ViewChild,ViewContainerRef} from '@angular/core';
import {Stream, Observe} from '../../../directive/DirectiveStream';

@Component({
    selector: 'directive-Observable-Test',
    template: `
       <section> 
         <div *ngFor="let bloc of message  ">
            <p>{{bloc}}<p>
         </div>
       </section>
    `
})
@Observe({
    stream: "observable-event",
    cible: ['message'],
    history: 4,
})
export class DirectiveObservableComponentTest {}
@Component({
    selector: 'directive-Observable-Test2',
    template: `
       <p> >>>> {{message}}  <<<<<<p>
    `
})
@Observe({
    stream: "observable-event",
    cible: ['message'],
})
export class DirectiveObservableComponentTest2 {}


@Component({
    selector: 'directive-Observable',
    template: `
        <div>Browser</div>
        <span observe="observable-event"  model="test"  ></span>
        <input #input  [(ngModel)]="name" >
        <div (click)="upstep()">Chat</div> 
        <<<< {{test}} >>>>>
        <directive-Observable-Test2></directive-Observable-Test2>
        <directive-Observable-Test></directive-Observable-Test>
    `
})
@Stream({
    stream: "observable-event",
    cible: 'ngStream',
})
export class DirectiveObservableComponent {
    @ViewChild('input', { read: ViewContainerRef }) public input: ViewContainerRef;
    test:string = '';
    name: string = '';
    upstep() {
        this.name = this.input.element.nativeElement.value;
        this.ngStream(this.name); 
        // Warning  (Math.random()) is interpret for all client 
    }


}