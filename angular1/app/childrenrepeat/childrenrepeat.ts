   angular
            .module('app.childrenRepeat')
            .component('pageChildrenrepeat', {
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
       controller: [childrenRepeatController]
    });
    
    
    function childrenRepeatController() {
        this.item = {
            title: "Sample No children 1",
        };
    

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

        this.pushAfter = function ($self) {
            if ($self.children) {
                this.pushIn($self.children);
            } else
                $self.children = [{title: "pushAfter Title 1"}];
        };

        this.pushIn = function ($parent) {
            $parent.push({title: "pushIn Title 2"});

        };
    }
