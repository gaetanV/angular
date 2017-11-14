interface QuickEditControllerScopeTypedef extends AngularScopeTypedef {
    clone: (tscope: TscopeTypedef) => void;
    pItem1: Array<ItemClass>;
    quickModel: string;


}
interface TscopeTypedef extends AngularListTypedef {
    item: ItemClass;
    form: ItemClass;
    editItem: {$valid: boolean};
    submit: () => void;

}
@Component({
    module: 'component-factory',
    selector: 'quickedit',
    template: `
       <section>
           <h1>Quick edit </h1>
           <div class="controller"  >
               <div class="scope">  {{pItem1}}</div>
               <ul>
                   <li ng-repeat="item in pItem1"   >
                       <div quick-edit="read">
                           <div  quick-model="edit" quick-action="clone">
                               <form  name="editItem"  ng-submit="submit(form)" >
                                   <input type="text"
                                          name="itemName"
                                          required="required"
                                          ng-pattern="/^[a-zA-Z0-9]*$/"
                                          ng-model="form.name">
                                   <input type="submit" value="send" >
                                   <button ng-click="switchModel('read')">x</button>
                                   <span class="error" ng-show="editItem.itemName.$error.required">Required!</span>
                                   <span class="error" ng-show="editItem.itemName.$error.pattern">No special character</span>
                               </form>
                           </div>
                           <div quick-model="read">
                               <p ng-click="switchModel('edit')">   {{item.name}}<button > edit</button></p>
                           </div>
                       </div>
                   </li>
               </ul>

           </div>
       </section>
    `,
    provider: ['$scope', 'ItemFactory']
})
class QuickEditController {
    constructor(
        $scope: QuickEditControllerScopeTypedef,
        ItemFactory: ItemFactory
    ) {

        $scope.clone = function (tscope: TscopeTypedef): void {
            tscope.form = angular.copy(tscope.item);
            tscope.submit = function (): void {
                if (tscope.editItem.$valid === true) {
                    $scope.pItem1[tscope.$index] = angular.copy(tscope.form);
                    $scope.quickModel = 'read';
                }
            };
        };

        $scope.pItem1 = [new ItemFactory.cap(), new ItemFactory.shirt(), new ItemFactory.shirt()];

    }

}
