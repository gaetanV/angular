function NgDragController($scope,ItemFactory) {

    $scope.pItem1 = [new ItemFactory.cap(), new ItemFactory.shirt(), new ItemFactory.shirt()];
    $scope.pItem2 = [new ItemFactory.cap(), new ItemFactory.cap(), new ItemFactory.shoe()];

    $scope.remove = function (list, $index) {
        console.log("remove");
        list.splice($index, 1);
    }

    $scope.add = function (list, item) {
        console.log("add");
        console.log(item);
        if (list.indexOf(item) == -1) {
            list.push(item)
        } else {
            console.log("item in collection exist >> add a copy");

            list.push(angular.copy(item))

        }
    };
    $scope.isValid = function ($transport) {
        return $transport.name == "cap";
    }
}

angular.module('app.ngDrag').component('ngOutDrag',{
  template:`
        <div class="controller"  >
            <h2>CONTROLLER 2  ( NgDrag )</h2>
            <h3>List Item 2</h3>
            First Item Name :
            <input ng-model="pItem2[0].name" />
            <br/>
            <div class="scope"> {{pItem2}}</div>
            <ul class="reception" ng-drop="namespace : 'groupe1' , callback :  'add(pItem2,$transport)'" >
                <li ng-repeat="item in pItem2"   >
                    <div ng-drag="transport : 'item'" > {{item.name}}</div>
                </li>
            </ul>
        </div>
        `,
    controller: ['$scope','ItemFactory',NgDragController]
});

angular.module('app.ngDrag').component('ngDrag',{
  template:`
        <section>
            <h1>Drag and Drop </h1>
            <div class="controller" >
                <h2> CONTROLLER 1 ( NgDrag ) </h2>
                <h3>List Item 1</h3>
                First Item Name :

                <input ng-model="pItem1[0].name" />
                <br/>
                <div class="scope"> {{pItem1}}</div>
                <ul class="reception" ng-drop=" callback : 'add(pItem1,$transport)' " >
                    <li ng-repeat="item in pItem1">
                        <div  ng-drag=" namespace : 'groupe1' ,  transport : 'item' , callback : 'remove(pItem1,$index)' "   > {{item.name}}  </div>
                    </li>
                </ul>

                <h3>List Item 2 (Constraint $transport.name="cap")</h3>
                First Item Name :
                <input ng-model="pItem2[0].name" />
                <br/>
                <div class="scope"> {{pItem2}}</div>
                <ul class="reception" ng-drop=" namespace : 'groupe1' , constraint: 'isValid($transport)' , callback : 'add(pItem2,$transport)'  "  >
                    <li ng-repeat="item in pItem2"   >
                        <div ng-drag=" transport : 'item' ,  callback : 'remove(pItem2,$index)'  " > {{item.name}}</div>
                    </li>
                </ul>
            </div>
            <ng-out-drag/>
        </section>
        `,
    controller: ['$scope','ItemFactory',NgDragController]
});