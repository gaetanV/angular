import {Component} from '@angular/core';
@Component({
    selector: 'app-directive-code',
    template: `
        <h1>Directive Code</h1>
        <div (click)="setPattern('./index.html')">Code1</div>
        <div (click)="setPattern('./test.ts')">Code2</div>
        <directive-code src="{{pattern}}" ></directive-code>
    `
})
export class CodeComponent {
    pattern: string = './index.html';

    setPattern(pattern: string) {
        this.pattern = pattern;
    }

}