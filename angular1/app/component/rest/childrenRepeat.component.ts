class ChildrenRepeatController {

    sample: Array<sample> = [];

    constructor(
        $element,
        ChildrenService: ChildrenService,
    ) {

        ChildrenService.getSample().then((sample:Array<sample>) => {
            this.sample = sample;
            $element.scope().$digest();
        });

    }

    pushAfter($self: sample): void {
        if ($self.children) {
            this.pushIn($self.children);
        } else
            $self.children = [{
                title: "pushAfter Title 1",
                children: [],
                id: 0
            }];
    };

    pushIn($parent: Array<sample>): void {
        $parent.push({
            title: "pushIn Title 2",
            children: [],
            id: 0
        });
    };
}

angular.module('component-rest').component('childrenRepeat', {
    template: `
        <section>
            <h1>Children-repeat (compile)</h1>
            <div class="controller" >
                <ul class="list-child" children-repeat ="item in $ctrl.sample track by children">
                    <li>
                        {{item.title}}  [ index: {{$index}} , depth : {{$depth}}  ] 
                        <span ng-click="$ctrl.pushIn($collection)"> push</span> 
                    </li>
                    <li  depth="end" >
                        END
                        {{item.title}}  [ index: {{$index}} , depth : {{$depth}}  ] 
                        <span ng-click="$ctrl.pushIn($collection)"> push</span> 
                        <div ng-click="$ctrl.pushAfter(item)">
                            [ AddChild level: {{$depth+1}} ] 
                        </div>
                    </li>
                </ul>
                <div class="scope">  {{$ctrl.sample}}</div>
            </div>
        </section>
    `,
    controller: ['$element', 'ChildrenService', ChildrenRepeatController]
});