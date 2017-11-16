import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {BootComponent} from './boot.component';

import {CodeComponent} from './directive/Component/code.component';
import {ObservableComponent,
        ObservableComponentTestComponent,
        ObservableComponentTest2Component
} from './directive/Component/observable.component';
import {GitComponent} from './directive/Component/git.component';

import {PipeSplitComponent} from './pipe/Component/pipe-split.component';

import {DirectiveCodeComponent} from '@directive/directive-code.component';
import {StreamDirective} from '@directive/stream.directive';
import {DirectiveGitComponent} from '@directive/directive-git.component';
import {SplitPipe} from '@pipe/split.pipe';

const appRoutes: Routes = [
    {path: 'DirectiveCode', component: CodeComponent},
    {path: 'DirectiveGit', component: GitComponent},
    {path: 'DirectiveObservable', component: ObservableComponent},
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
        ObservableComponent,
        ObservableComponentTestComponent,
        ObservableComponentTest2Component,
        PipeSplitComponent,
        CodeComponent,
        GitComponent,
        StreamDirective,
        SplitPipe,
        DirectiveGitComponent,
        DirectiveCodeComponent
    ],
    bootstrap: [BootComponent]
})
export class AppModule {}
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);
