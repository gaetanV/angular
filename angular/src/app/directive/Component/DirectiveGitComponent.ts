import {Component} from '@angular/core';
@Component({
    selector: 'app-directive-git',
    template: `
        <h1>Directive Git</h1>
        <div (click)="setPattern('angular/src/lib/directive/DirectiveCode.ts')">DirectiveCode</div>
        <div (click)="setPattern('angular/src/lib/directive/DirectiveGit.ts')">DirectiveGit</div>
        <div>
             <git user="gaetanV" repositories="angular" branch="master" path="{{pattern}}" ></git>
        </div>
    `
})
export class DirectiveGitComponent {
    pattern = 'angular/src/lib/directive/DirectiveCode.ts';

    setPattern(pattern: string) {
        this.pattern = pattern;
    }

}
