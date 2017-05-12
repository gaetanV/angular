import {Component} from '@angular/core';
@Component({
    selector: 'directive-Git',
    template: `
        <h1>Directive Git</h1>
        <git user="gaetanV" repositories="angular" branch="master" path="angular1/directive/gitRepro.directive.js" ></git>
    `
})
export class DirectiveGitComponent {}