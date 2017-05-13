import {Component} from '@angular/core';
@Component({
    selector: 'my-demo',
    template: `
        <h1>Angular directives collection</h1>
        <a routerLink="/DirectiveCode">DirectiveCode</a>
        <a routerLink="/DirectiveGit">DirectiveGit</a>
        <a routerLink="/DirectiveObservable">DirectiveObservable</a>
        <router-outlet></router-outlet>
    `
})
class BootComponent {}
import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {DirectiveCodeComponent} from './../src/directive/Component/DirectiveCodeComponent';
import {DirectiveGitComponent} from './../src/directive/Component/DirectiveGitComponent';
import {DirectiveObservableComponent,DirectiveObservableComponentTest} from './../src/directive/Component/DirectiveObservableComponent';

const appRoutes: Routes = [
    {path: 'DirectiveCode', component: DirectiveCodeComponent},
    {path: 'DirectiveGit', component: DirectiveGitComponent},
    {path: 'DirectiveObservable', component: DirectiveObservableComponent},
];
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {DirectiveGit} from './../directive/DirectiveGit';
import {DirectiveCode} from './../directive/DirectiveCode';


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
    declarations: [
        BootComponent, 
        DirectiveObservableComponent,DirectiveObservableComponentTest,
        DirectiveCodeComponent, 
        DirectiveGitComponent ,
        DirectiveGit,
        DirectiveCode
    ],
    bootstrap: [BootComponent]
})
class AppModule {}
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);