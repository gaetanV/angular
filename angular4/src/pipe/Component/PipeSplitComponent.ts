import {Component} from '@angular/core';


@Component({
    selector: 'pipe-split',
    template: `
       <section  > 
         <div *ngFor="let bloc of message|split:'|||' ">
            <p>{{bloc}}<p>
         </div>
       </section>
    `
})

export class PipeSplitComponent {
    
     message: string = '1|||2|||3';
}

