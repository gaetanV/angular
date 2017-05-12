import {Component, Input, Inject} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'git',
    template: `<pre>{{code}}</pre>`,
})

export class DirectiveGit {
    @Input() user: string;
    @Input() repositories: string;
    @Input() branch: string;
    @Input() path: string;
    code: string = "Loading";
    
    constructor(
        @Inject(Http) private http: Http
    ) {}

    ngOnInit() {
        if (!this.user) throw new Error("user is required");
        if (!this.repositories) throw new Error("repositories is required");
        if (!this.branch) throw new Error("branch is required");
        if (!this.path) throw new Error("path: is required");

        this.http.get(`https://api.github.com/repos/${this.user}/${this.repositories}/git/trees/${this.branch}?recursive=1`)
            .subscribe(
            (data) => {
                var data_js = data.json();
                if (!data_js.tree) {
                    throw new Error("Not tree");
                } else {
                    var index = data_js.tree.findIndex((e) => {return e.path == this.path});
                    if (index == -1) {
                        throw new Error("Ressource not found");
                    } else {
                        this.http.get(data_js.tree[index].url)
                            .subscribe(
                            (data) => {
                                this.code =  atob(data.json().content);
                            },
                            (error) => { throw new Error("Http error"); }
                        )
                    }
                }
            },
            (error) => { throw new Error("Http error"); } 
        );
    }
}