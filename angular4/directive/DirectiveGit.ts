import {Component, Input, Inject } from '@angular/core';
import {ServiceGit} from '../service/ServiceGit';


@Component({
    selector: 'git',
    template: `<pre>{{code}}</pre>`,
    providers: [ServiceGit]
})

export class DirectiveGit {

    @Input() user: string;
    @Input() repositories: string;
    @Input() branch: string;
    @Input() path: string;
    code: string = "";

    constructor(
        @Inject(ServiceGit) private git: ServiceGit,
    ) {}
    
    ngStreamGit(){
        console.log("super");
    }
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
        this.code = "Loading";
        this.git.getPath(this.user, this.repositories, this.branch, this.path).then(
            (data: string) => this.code = data,
            (error:string) => this.code = error,
        )

    }

}