angular.module('app.form').component('ckeditor',{
  template:`
        <section>
            <h1>Ck editor</h1>
            <div class="controller">
                <div class="scope"> {{ckeditor}}</div>   
                <div ckeditor ng-model="ckeditor">ddd</div>
                <div  code="directive/ckeditor.directive.js" > </div>
            </div>
        </section>
    `,
    controller: [()=>{}]
});
