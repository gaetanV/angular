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
    code: string = "";

    constructor(
        @Inject(Http) private http: Http
    ) {}

    ngOnInit() {
        if (!this.user) throw new Error("user is required");
        if (!this.repositories) throw new Error("repositories is required");
        if (!this.branch) throw new Error("branch is required");
        if (!this.path) throw new Error("path: is required");
        this.serviceGit();
    }

    ngOnChanges() {
        this.serviceGit();
    }

    serviceGit() {
        this.code =  "Loading";
        this.http.get(`https://api.github.com/repos/${this.user}/${this.repositories}/git/trees/${this.branch}?recursive=1`)
            .subscribe(
            (data) => {
                var data_js = data.json();
                if (!data_js.tree) {
                    this.code = "Error in Ressource map data : missing tree index";
                } else {
                    var index = data_js.tree.findIndex((e) => {return e.path == this.path && e.url});
                    if (index == -1) {
                        this.code = "Error final ressource not found in map";
                    } else {
                        this.http.get(data_js.tree[index].url)
                            .subscribe(
                            (data) => {
                                var tmp = data.json();
                                if (!tmp.content) {
                                    this.code = "Error in final ressource : missing content index";
                                } else {
                                    this.code = atob(tmp.content);
                                }
                            },
                            (error) => {
                                this.code = `Error Http ${data_js.tree[index].url}`;
                            }
                            )
                    }
                }
            },
            (error) => {
                this.code = `Error Http https://api.github.com/repos/${this.user}/${this.repositories}/git/trees/${this.branch}?recursive=1`;
            }
        );

    }

}