class ChildrenRepeatController{
    
    sample: Array<any> = [];
    
    constructor(
        $element,
        ChildrenService,
    ){

        ChildrenService.getSample().then((sample)=>{
            this.sample = sample;
            $element.scope().$digest();
        });
       
    }  
    
    pushAfter($self) {
        if ($self.children) {
            this.pushIn($self.children);
        } else
            $self.children = [{title: "pushAfter Title 1"}];
    };

    pushIn($parent) {
        $parent.push({title: "pushIn Title 2"});

    };
}
    
angular.module('app.childrenRepeat').component('pageChildrenrepeat', {
    template:
        `<section>
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
        </section>`,
    controller: ['$element','ChildrenService', ChildrenRepeatController]
 });