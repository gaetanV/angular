@Component({
    module: 'component-factory',
    selector: 'ng-out-drag',
    template: `
        <div class="controller"  >
            <h2>CONTROLLER 2  ( NgDrag )</h2>
            <h3>List Item 2</h3>
            First Item Name :
            <input ng-model="$ctrl.pItem2[0].name" />
            <br/>
            <div class="scope"> {{$ctrl.pItem2}}</div>
            <ul class="reception" ng-drop="namespace : 'groupe1' , callback :  '$ctrl.add($ctrl.pItem2,$transport)'" >
                <li ng-repeat="item in $ctrl.pItem2"   >
                    <div ng-drag="transport : 'item'" > {{item.name}}</div>
                </li>
            </ul>
         </div>
    `,
    provider: ['$scope', 'ItemFactory']
})
@Component({
    module: 'component-factory',
    selector: 'ng-drag',
    template: `        
        <section>
            <h1>Drag and Drop </h1>
            <div class="controller" >
                <h2> CONTROLLER 1 ( NgDrag ) </h2>
                <h3>List Item 1</h3>
                First Item Name :

                <input ng-model="$ctrl.pItem1[0].name" />
                <br/>
                <div class="scope"> {{$ctrl.pItem1}}</div>
                <ul class="reception" ng-drop=" callback : '$ctrl.add($ctrl.pItem1,$transport)' " >
                    <li ng-repeat="item in $ctrl.pItem1">
                        <div  ng-drag=" namespace : 'groupe1' ,  transport : 'item' , callback : '$ctrl.remove($ctrl.pItem1,$index)' "   > {{item.name}}  </div>
                    </li>
                </ul>

                <h3>List Item 2 (Constraint $transport.name="cap")</h3>
                First Item Name :
                <input ng-model="$ctrl.pItem2[0].name" />
                <br/>
                <div class="scope"> {{$ctrl.pItem2}}</div>
                <ul class="reception" ng-drop=" namespace : 'groupe1' , constraint: '$ctrl.isValid($transport)' , callback : '$ctrl.add($ctrl.pItem2,$transport)'  "  >
                    <li ng-repeat="item in $ctrl.pItem2"   >
                        <div ng-drag=" transport : 'item' ,  callback : '$ctrl.remove($ctrl.pItem2,$index)'  " > {{item.name}}</div>
                    </li>
                </ul>
            </div>
            <ng-out-drag/>
        </section>
         
    `,
    provider: ['$scope', 'ItemFactory']
})
class NgDragController {

    pItem1: Array<itemClass>;
    pItem2: Array<itemClass>;

    constructor(
        $scope: angularScopeTypedef,
        ItemFactory: ItemFactory
    ) {
        this.pItem1 = [new ItemFactory.cap(), new ItemFactory.shirt(), new ItemFactory.shirt()];
        this.pItem2 = [new ItemFactory.cap(), new ItemFactory.cap(), new ItemFactory.shoe()];
    }

    remove(list: Array<itemClass>, $index: number): void {
        list.splice($index, 1);
    }

    add(list: Array<itemClass>, item: itemClass): void {
        if (list.indexOf(item) == -1) {
            list.push(item)
        } else {
            console.log("item in collection exist >> add a copy");
            list.push(angular.copy(item))
        }
    }

    isValid($transport: any): boolean {
        return $transport.name == "cap";
    }
}
