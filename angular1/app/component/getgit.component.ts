angular.module('component').component('getGit', {
    template: `
        <section>
            <h1>GIT : Repro</h1>
            <div class="controller" >
                <div  git-repro="user : 'gaetanV',repositories :'angular_directive',branch:'master',path:'angular1/directive/gitRepro.directive.js'" > </div>
            </div>
        </section>
    `,
});
