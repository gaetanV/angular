angular.module('app.date').component('pageDatepicker',{
    template:`
        <section>
            <h1>Date Picker</h1>
            <div class="controller">
                <form name="formDatePicker"  class="css-form" >
                    <label> Date  </label>
                    <input type="text" ng-model="date" date-picker="fr"  name="uDate" required="" />
                </form>
            </div>
        </section>
    `
});