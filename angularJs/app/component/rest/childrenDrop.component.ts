interface ChildrenDropControllerScopeTypedef extends AngularScopeTypedef {
    list: Array<Sample>;
}
interface DragScopeTypedef extends AngularListTypedef {
    $collection: Array<Sample>;
}

class ChildrenDropController {

    constructor(
        $scope: ChildrenDropControllerScopeTypedef,
        ChildrenService: ChildrenService,
    ) {

        ChildrenService.getSample().then((Sample: Array<Sample>) => {
            $scope.list = Sample;
            $scope.$digest();
        });
    }

    static inCollection(array: Array<Sample>, $transport: Sample): boolean {

        if (array.indexOf($transport) !== -1) {
            return false;
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i].children) {
                return ChildrenDropController.inCollection(array[i].children, $transport);
            }
        }
        return true;
    }

    isNotChild($transport: Sample, item: Sample): boolean {

        if ($transport === item) {
            return false;
        }

        if ($transport.children && $transport.children.indexOf(item) !== -1) {
            return false;
        }


        if (item.children) {
            return ChildrenDropController.inCollection(item.children, $transport);
        }

        return true;

    }

    isNotFirstDepth($dragScope: DragScopeTypedef): boolean {
        return $dragScope.$depth > 1;
    }

    pushChildren($transport: Sample, $item: Sample, $dragScope: DragScopeTypedef): void {
        $dragScope.$collection.splice($dragScope.$index, 1);
        if (!$item.children) {
            $item.children = new Array();
        }
        $item.children.unshift($transport);
    }

    push($transport: Sample, $item: Array<Sample>, $dragScope: DragScopeTypedef): void {
        $dragScope.$collection.splice($dragScope.$index, 1);
        $item.unshift($transport);
    }

}

angular.module('component-rest').component('childrenDrop', {
    template: `
            <section>
                <h1>Children-repeat + Ng-drop directive</h1>
                <div class="controller childDrop" >
                    <div class="scope"> {{list}}</div>
                    <div  ng-hide="loading">
                        <div  ng-drop="callback:  '$ctrl.push( $transport , list , $drag )' , constraint: '$ctrl.isNotFirstDepth($drag)' ">Root</div>
                        <ul class="list-child" children-repeat="item in list track by children">
                            <li >
                                <div  ng-drag= "transport : 'item'   " ng-drop=" constraint: '$ctrl.isNotChild(item,$transport)' , callback : '$ctrl.pushChildren( $transport , item , $drag )'   "   >
                                    {{item.title}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        `,
    controller: ['$scope', 'ChildrenService', ChildrenDropController]
});
