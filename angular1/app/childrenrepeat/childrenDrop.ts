angular
    .module('app.childrenRepeat')
    .component('pageChildrendrop', {
        template:
        `<section>
            <h1>Children-repeat + Ng-drop directive</h1>
            <div class="controller childDrop" >
                <div class="scope"> {{list}}</div>
                <div  ng-hide="loading">  
                    <div  ng-drop="callback:  'push( $transport , list , $drag )' , constraint: 'isNotFirstDepth($drag)' ">Root</div>
                    <ul class="list-child" children-repeat="item in list track by children">
                        <li >
                            <div  ng-drag= "   transport : 'item'   " ng-drop=" constraint: 'isNotChild(item,$transport)' , callback : 'pushChildren( $transport , item , $drag )'   "   >
                                {{item.title}}  
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>`
        ,
        controller: ["$scope", ChildrenDropController]
    });

function ChildrenDropController($scope) {
    $scope.list = [
        {
            title: "Sample No children 1",
        },
        {
            title: "Sample Title 1",
            children: [
                {
                    title: "Child Title 1",
                    children: [{title: "Child Title 3", children: []}, {title: "Child Title 3"}]
                },
                {title: "Child Title 2"}
            ]
        },
        {
            title: "Sample Title 2",
            children: [{title: "Child Title 1"}, {title: "Child Title 2"}]
        }
    ];


    $scope.isNotFirstDepth = function ($dragScope) {
        return $dragScope.$depth > 1;
    };

    $scope.isNotChild = function ($transport, item) {
        var flag = true;
        if ($transport.children)
            if ($transport.children.indexOf(item) != -1)
                return false;

        if ($transport == item)
            return false;
        function inCollection(array) {

            if (array.indexOf($transport) != -1) {
                flag = false;
            }
            for (var i = 0; i < array.length; i++) {
                if (array[i].children)
                    inCollection(array[i].children);
            }

        }
        if (item.children)
            inCollection(item.children);
        return flag;

    };

    $scope.push = function ($transport, $item, $dragScope) {
        $dragScope.$collection.splice($dragScope.$index, 1);
        $item.unshift($transport);
    };

    $scope.pushChildren = function ($transport, $item, $dragScope) {
        $dragScope.$collection.splice($dragScope.$index, 1);
        if (!$item.children) {
            $item.children = new Array();
        }
        $item.children.unshift($transport);
    };
}
