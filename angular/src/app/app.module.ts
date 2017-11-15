import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BootComponent} from './boot.component';
import {DirectiveCodeComponent} from './directive/Component/DirectiveCodeComponent';
import {DirectiveGitComponent} from './directive/Component/DirectiveGitComponent';
import {DirectiveObservableComponent, DirectiveObservableComponentTest, DirectiveObservableComponentTest2}
from './directive/Component/DirectiveObservableComponent';
import {PipeSplitComponent} from './pipe/Component/PipeSplitComponent';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {DirectiveStreamDirective} from '@directive/DirectiveStream';
import {DirectiveGit} from '@directive/DirectiveGit';
import {DirectiveCode} from '@directive/DirectiveCode';
import {PipeSplit} from '@pipe/PipeSplit';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
    {path: 'DirectiveCode', component: DirectiveCodeComponent},
    {path: 'DirectiveGit', component: DirectiveGitComponent},
    {path: 'DirectiveObservable', component: DirectiveObservableComponent},
    {path: 'PipeSplitComponent', component: PipeSplitComponent},
];

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
        DirectiveStreamDirective,
        DirectiveGit,
        DirectiveCode
    ],
    bootstrap: [BootComponent]
})
export class AppModule {}
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);
