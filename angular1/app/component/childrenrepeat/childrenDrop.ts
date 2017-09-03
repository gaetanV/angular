class ChildrenDropController {

    constructor(
        $scope,
        $element,
        ChildrenService: ChildrenService,
    ) {

        ChildrenService.getSample().then((sample:Array<sample>) => {
            $scope.list = sample;
            $element.scope().$digest();
        });

    }

    static inCollection(array: Array<sample>, $transport: sample): boolean {

        if (array.indexOf($transport) != -1) {
            return false;
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i].children)
                return ChildrenDropController.inCollection(array[i].children, $transport);
        }
        return true;
    }

    isNotChild($transport: sample, item: sample): boolean {

        if ($transport == item)
            return false;

        if ($transport.children && $transport.children.indexOf(item) != -1)
            return false;


        if (item.children)
            return ChildrenDropController.inCollection(item.children, $transport);

        return true;

    }

    isNotFirstDepth($dragScope): boolean {
        return $dragScope.$depth > 1;
    }

    pushChildren($transport: sample, $item: sample, $dragScope): void {
        $dragScope.$collection.splice($dragScope.$index, 1);
        if (!$item.children) {
            $item.children = new Array();
        }
        $item.children.unshift($transport);
    }

    push($transport: sample, $item: Array<sample>, $dragScope): void {
        $dragScope.$collection.splice($dragScope.$index, 1);
        $item.unshift($transport);
    };

}

angular.module('app.childrenRepeat').component('pageChildrendrop', {
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
    controller: ["$scope", '$element', 'ChildrenService', ChildrenDropController]
}
);

