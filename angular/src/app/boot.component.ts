import {Component} from '@angular/core';
@Component({
    selector: 'my-demo',
    template: `
        <h1>Angular directives collection</h1>
        <nav>
            <a routerLink="/DirectiveCode">DirectiveCode</a>
            <a routerLink="/DirectiveGit">DirectiveGit</a>
            <a routerLink="/DirectiveObservable">DirectiveObservable</a>
        </nav>
        <nav>
            <a routerLink="/PipeSplitComponent">PipeSplit</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class BootComponent {}