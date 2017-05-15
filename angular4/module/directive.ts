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
class BootComponent {}
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DirectiveCodeComponent} from './../src/directive/Component/DirectiveCodeComponent';
import {DirectiveGitComponent} from './../src/directive/Component/DirectiveGitComponent';
import {DirectiveObservableComponent, DirectiveObservableComponentTest, DirectiveObservableComponentTest2} from './../src/directive/Component/DirectiveObservableComponent';
import {PipeSplitComponent} from './../src/pipe/Component/PipeSplitComponent';

const appRoutes: Routes = [
    {path: 'DirectiveCode', component: DirectiveCodeComponent},
    {path: 'DirectiveGit', component: DirectiveGitComponent},
    {path: 'DirectiveObservable', component: DirectiveObservableComponent},
    {path: 'PipeSplitComponent', component: PipeSplitComponent},
];
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {DirectiveGit} from './../directive/DirectiveGit';
import {DirectiveCode} from './../directive/DirectiveCode';
import {PipeSplit} from './../pipe/PipeSplit';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
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
        DirectiveObservableComponent, DirectiveObservableComponentTest, DirectiveObservableComponentTest2,
        PipeSplit,
        PipeSplitComponent,
        DirectiveCodeComponent,
        DirectiveGitComponent,
        DirectiveGit,
        DirectiveCode
    ],
    bootstrap: [BootComponent]
})
class AppModule {}
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);