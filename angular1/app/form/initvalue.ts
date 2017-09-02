angular.module('app.form').component('initValue',{
  template:`
        <section>
            <h1>Init Value</h1>
            <div class="controller">
                {{user}}
                <form name="formFinder"  class="css-form" >
                    <input ng-model="user.user_email"  name="user_email"  init-value  type="text"   required="required" value="gaetan.vigneron@workshop.fr"/>
                </form>
            </div>
        </section>
    `,
    controller: [()=>{}]
});
