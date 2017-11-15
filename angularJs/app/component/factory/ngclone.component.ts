@Component({
    module: 'component-factory',
    selector: 'ng-clone',
    template: `<section>
            <h1>Drag and Drop and Clone </h1>
            <div class="controller">
                <h2>  CONTROLLER  ( NgDrag )</h2>
                First Item Name :
                <br/>
                <input ng-model="$ctrl.pItem1[0].name" />
                <article  ng-drag >{{$ctrl.pItem1[0].name}} </article>
                <div  class="reception"  ng-drop >Clone in controller</div>
            </div>
            <div class="reception"  ng-drop  > Clone Out of controller</div>
        </section>`,
    provider: ['ItemFactory']
})
class NgCloneController {

    pItem1: Array<ItemClass>;
    pItem2: Array<ItemClass>;

    constructor(
        ItemFactory: ItemFactory
    ) {
        this.pItem1 = [new ItemFactory.cap(), new ItemFactory.shirt(), new ItemFactory.shirt()];
        this.pItem2 = [new ItemFactory.cap(), new ItemFactory.cap(), new ItemFactory.shoe()];
    }

}
