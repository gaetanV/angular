angular.module('component').component('multipattern', {
    template: `
        <section>
            <h1>Form : Multi Pattern </h1>
            <div class="controller">
                <form name="formMatch"  class="css-form" >
                    <label> Input  1</label>
                    <input type="text"
                           ng-model="user.name"
                           multi-pattern='{"num": "[0-9]+" ,"Cara": "[a-zA-Z]{8}" }'
                           name="uName"
                           required="" />
                    <span ng-show="formMatch.uName.$error.required">Tell us your name.</span>
                    <span ng-show="formMatch.uName.$error.Cara">Error pattern Cara</span>
                    <span ng-show="formMatch.uName.$error.num">Error pattern num</span>
                </form>
            </div>
        </section>
        <div class="scope">{{formMatch.uName.$error}}</div>
    `,
});
