import {Component} from '@angular/core';
@Component({
    selector: 'app-directive-git',
    template: `
        <h1>Directive Git</h1>
        <div (click)="setPattern('angular/src/lib/directive/directive-code.component.ts')">DirectiveCode</div>
        <div (click)="setPattern(git.component.ts)">DirectiveGit</div>
        <div>
             <directive-git user="gaetanV" repositories="angular" branch="master" path="{{pattern}}" ></directive-git>
        </div>
    `
})
export class GitComponent {
    pattern = 'angular/src/lib/directive/code.component.ts';

    setPattern(pattern: string) {
        this.pattern = pattern;
    }

}
