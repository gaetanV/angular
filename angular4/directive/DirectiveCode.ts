import {Component, Input, Inject} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'code',
    template: `<pre>{{code}}</pre>`,
})
export class DirectiveCode {
    code : string = "Set your src";
    
    constructor(
        @Inject(Http) private http: Http
    ) {}
    
    @Input()
    set src(src) {
        this.code = "Loading";
        this.http.get(src)
        .subscribe(
            (data) => {
                this.code = (data.text());
            },
            (error) => {
                this.code = (`Error Http ${src}`);
            }
        );
    }
}