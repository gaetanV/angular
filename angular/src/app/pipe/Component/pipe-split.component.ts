import {Component} from '@angular/core';

@Component({
    selector: 'app-pipe-split',
    template: `
       <section>
         <div *ngFor="let bloc of message|split:'|||' ">
            <p>{{bloc}}<p>
         </div>
       </section>
    `
})

export class PipeSplitComponent {
     message = '1|||2|||3';
}

