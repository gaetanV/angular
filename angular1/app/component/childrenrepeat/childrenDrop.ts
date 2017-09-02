class ChildrenDropController {
    
    constructor(
        $scope,
        $element,
        ChildrenService,
    ){
    
        ChildrenService.getSample().then((sample)=>{
            $scope.list = sample;
            $element.scope().$digest();
        });
  
    }
    
    isNotChild($transport, item){
        
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
        
    }
    
    isNotFirstDepth($dragScope){
       return $dragScope.$depth > 1;
    }
    
    pushChildren ($transport, $item, $dragScope){
        $dragScope.$collection.splice($dragScope.$index, 1);
        if (!$item.children) {
            $item.children = new Array();
        }
        $item.children.unshift($transport);
    }
    
    push($transport, $item, $dragScope) {
        $dragScope.$collection.splice($dragScope.$index, 1);
        $item.unshift($transport);
    };
    
}

angular.module('app.childrenRepeat').component('pageChildrendrop', {
        template:
            `<section>
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
            </section>`
        ,
        controller: ["$scope",'$element','ChildrenService', ChildrenDropController]
    }
);

