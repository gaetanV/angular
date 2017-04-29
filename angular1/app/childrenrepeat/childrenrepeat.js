(function () {
    'use strict';
    angular
            .module('app.childrenRepeat')
            .controller('ChildrenRepeat', ChildrenRepeat);

    ChildrenRepeat.$inject = ['$scope'];

    function ChildrenRepeat($scope) {
        $scope.item = {
            title: "Sample No children 1",
        };
        $scope.result = ["1", "2"];

        $scope.sample = [
            {
                title: "Sample No children 1",
                id: "1",
            },
            {
                title: "Sample Title 1",
                id: "2",
                children: [
                    {
                        title: "Child Title 1",
                        id: "9",
                        children: [{title: "Child Title 3", children: []}, {title: "Child Title 3", id: "3"}]
                    },
                    {title: "Child Title 2", id: "7"}
                ]},
            {
                title: "Sample Title 2",
                children: [{title: "Child Title 1", id: "8"}, {title: "Child Title 2", id: "6"}]}
        ];

        $scope.pushAfter = function ($self) {
            if ($self.children) {
                $scope.pushIn($self.children);
            } else
                $self.children = [{title: "pushAfter Title 1"}];
        };

        $scope.pushIn = function ($parent) {
            $parent.push({title: "pushIn Title 2"});

        };
    }
})();