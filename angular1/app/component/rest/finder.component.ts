class FinderController {

    user: object =  {
        Car: 1
    };
    Cars: Array<Car> = [];


    constructor(
        CarsService: CarsService
    ) {
        CarsService.getCars().then((Cars: Array<Car>) => this.Cars = Cars);
    }
}

angular.module('component-rest').component('finder', {
    template: `
        <section>
            <h1>Finder Field</h1>
            <div class="controller">
                <form name="formFinder"  class="css-form" >
                    <h2> single</h2>
                    <div class="scope">{{$ctrl.user.Car}}</div>
                    <select  ng-model="$ctrl.user.Car"  name="uCar" finder-field="4" >
                        <option ng-repeat="Car in $ctrl.Cars"  ng-value="Car.id">{{Car.mark}}</option>
                    </select>
                    <br/>
                    <div class="scope">{{user.Model}}</div>
                    <select  ng-model="user.Model"  name="uModel" finder-field="4" >
                        <option ng-repeat="Car in $ctrl.Cars"  ng-value="Car.id">{{Car.mark}}</option>
                    </select>
                    <br/>
                    <h2> multiple</h2>
                    <div class="scope">{{user.Multi}}</div>
                    <select  ng-model="user.Multi"  name="uModel" finder-field="4" multiple  >
                        <option ng-repeat="Car in $ctrl.Cars"  ng-value="Car.id">{{Car.mark}}</option>
                    </select>
                </form>
            </div>
        </section>
        <div  code="directive/finderField.directive.js" > </div>
    `,
    controller: ['CarsService', FinderController]
});

