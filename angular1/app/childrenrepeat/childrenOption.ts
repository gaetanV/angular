
(function () {
    'use strict';
    angular
    .module('app.childrenRepeat')
    .component('pageChildrenoption', {
    template:
                        `<section>
        <h1>Children-option</h1>
        <div class="controller childDrop" >
            {{ $ctrl.result}}
            <select children-option="id as title in $ctrl.sample track by children" required multiple ng-model=" $ctrl.result" ></select>
            <br/>
            <br/>
            <br/>
            {{ $ctrl.result2}}
            <select children-option="id as title in $ctrl.sample track by children" required ng-model=" $ctrl.result2" ></select>
        </div>
    </section>`
    ,
    controller: [ChildrenOptionController]});

    function ChildrenOptionController() {
        this.result = ["1", "2"];        this.result = ["1", "2"];

        this.sample = [
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

    }


})();