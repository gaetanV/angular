import {Component} from '@angular/core';
@Component({
    selector: 'my-demo',
    template: `
        <h1>Angular directives collection</h1>
        <a routerLink="/Directive1">Directive1</a>
        <a routerLink="/DirectiveGit">DirectiveGit</a>
        <router-outlet></router-outlet>
    `
})
class BootComponent {}
import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {Directive1Component} from './../src/directive/Component/Directive1Component';
import {DirectiveGitComponent} from './../src/directive/Component/DirectiveGitComponent';
const appRoutes: Routes = [
    {path: 'Directive1', component: Directive1Component},
    {path: 'DirectiveGit', component: DirectiveGitComponent},
];
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {DirectiveGit} from '../../directive/DirectiveGit';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/',
        }
    ],
    declarations: [BootComponent, Directive1Component, DirectiveGitComponent ,DirectiveGit],
    bootstrap: [BootComponent]
})
class AppModule {}
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);