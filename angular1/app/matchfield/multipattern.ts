angular.module('app.field').component('multipattern',{
  template:`
        <section>
            <h1>Form : Multi Pattern </h1>
            <div class="controller">
                <form name="formMatch"  class="css-form" >
                    <label> Input  1</label>
                    <input type="text" ng-model="user.name" multi-pattern='{
                           "num": "[0-9]+" ,   "cara": "[a-zA-Z]+"
                           }'  name="uName" required="" />
                    <span ng-show="formMatch.uName.$error.required">Tell us your name.</span>
                    <span ng-show="formMatch.uName.$error.cara">Error pattern cara</span>
                    <span ng-show="formMatch.uName.$error.num">Error pattern num</span>
                </form>
            </div>
        </section>
    `,
    controller: [()=>{}]
});