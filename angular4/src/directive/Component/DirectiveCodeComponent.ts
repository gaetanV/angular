import {Component} from '@angular/core';
@Component({
    selector: 'directive-Code',
    template: `
        <h1>Directive Code</h1>
        <div (click)="setPattern('./directive/directiveCode.ts')">Code1</div>
        <div (click)="setPattern('./directive/directiveGit.ts')">Code2</div>
        <code src="{{pattern}}" ></code>`
})
export class DirectiveCodeComponent {
    pattern: string = "./directive/directiveCode.ts";

    setPattern(pattern: string) {
        this.pattern = pattern;
    }
}
