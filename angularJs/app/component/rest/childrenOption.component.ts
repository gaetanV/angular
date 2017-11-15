interface ChildrenOptionControllerScopeTypedef extends AngularScopeTypedef {
    Sample: Array<Sample>;
}

class ChildrenOptionController {

    result: Array<string> = ['2', '1'];
    result2: Array<string> = [];

    constructor(
        $scope: ChildrenOptionControllerScopeTypedef,
        ChildrenService: ChildrenService,
    ) {

        ChildrenService.getSample().then((Sample: Array<Sample>) => {
            $scope.Sample = Sample;
            $scope.$digest();
        });

    }
}
angular.module('component-rest').component('childrenOption', {
    template: `
            <section>
                <h1>Children-option</h1>
                <div class="controller childDrop" >
                    {{ $ctrl.result}}
                    <select children-option="id as title in Sample track by children" required multiple ng-model="$ctrl.result" ></select>
                    <br/>
                    {{ $ctrl.result2}}
                    <select children-option="id as title in Sample track by children" required ng-model="$ctrl.result2" ></select>
                </div>
            </section>
        `,
    controller: ['$scope', 'ChildrenService', ChildrenOptionController]
});
