(function () {
    'use strict';
    angular
            .module('app.childrenRepeat')
            .controller('ChildrenDrop', ChildrenDrop);

    ChildrenDrop.$inject = ['$scope'];
    
    function ChildrenDrop($scope) {
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
                ]},
            {
                title: "Sample Title 2",
                children: [{title: "Child Title 1"}, {title: "Child Title 2"}]}
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
})();