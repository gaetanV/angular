import {Component} from '@angular/core';
@Component({
    selector: 'directive-Git',
    template: `
        <h1>Directive Git</h1>
        <div (click)="setPattern('angular4/directive/DirectiveCode.ts')">DirectiveCode</div>
        <div (click)="setPattern('angular4/directive/DirectiveGit.ts')">DirectiveGit</div>
        <div>
             <git user="gaetanV" repositories="angular" branch="master" path="{{pattern}}" ></git>
        </div> 
    `
})
export class DirectiveGitComponent {
    pattern: string = "angular4/directive/DirectiveGit.ts";

    setPattern(pattern: string) {
        this.pattern = pattern;
    }

}