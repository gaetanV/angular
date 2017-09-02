
function NgDragController($scope) {

    $scope.pItem1 = [new cap(), new shirt(), new shirt()];
    $scope.pItem2 = [new cap(), new cap(), new shoe()];

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



angular.module('app.ngDrag').component('ngClone',{
  template:`
    <section>
        <h1>Drag and Drop and Clone </h1>
        <div class="controller">
            <h2>  CONTROLLER  ( NgDrag )</h2>
            First Item Name :
            <br/>
            <input ng-model="pItem1[0].name" />
            <article  ng-drag >{{pItem1[0].name}} </article>      
            <div  class="reception"  ng-drop >Clone in controller</div>
        </div>
        <div class="reception"  ng-drop  > Clone Out of controller</div>
    </section>
  `,
  controller: ['$scope',NgDragController]
});