(function() {
    'use strict';
    angular
            .module('app.childrenRepeat')
            .controller('ChildrenRepeat', ChildrenRepeat);

    ChildrenRepeat.$inject = ['$scope'];

    function ChildrenRepeat($scope) {
        $scope.item = {
            title: "Sample No children 1",
        };

        $scope.sample = [
            {
                title: "Sample No children 1",
            },
            {
                title: "Sample Title 1",
                children: [
                    {
                        title: "Child Title 1",
                        children: [{title: "Child Title 3"}, {title: "Child Title 3"}]
                    },
                    {title: "Child Title 2"}
                ]},
            {
                title: "Sample Title 2",
                children: [{title: "Child Title 1"}, {title: "Child Title 2"}]}
        ];
        $scope.push = function() {

            $scope.sample.push(
                    {
                        title: "Sample Title 2",
                        children: [{title: "Child Title 1"}, {title: "Child Title 2"}]
                    }
            );

        }

        $scope.pushchild = function() {

            $scope.sample[1].children.push(
                    {
                        title: "Sample Title 2",
                        children: [{title: "Child Title 1"}, {title: "Child Title 2"}]
                    }
            );

        };

        $scope.pushTop = function($self) {

            if ($self.children) {
                $self.children.push({
                    title: "test Title 2",
                });
            } else
                $self.children = [{title: "Child Title 1"}];
        };

        $scope.pushID = function($parent) {

            $parent.push({
                title: "test Title 2",
            });


        }

    }
    
    
})();