describe('ngClone', () => {

    var ctrl;

    beforeEach(module('component-factory'));

    beforeEach(inject((_$componentController_) => {
        ctrl = _$componentController_('ngClone', null, {});
    }));

    describe('$scope', () => {
        it('ItemFactory object name', () => {
            expect(ctrl.pItem2[0].name).toEqual('cap');
        });
        it('ItemFactory array length', () => {
            expect(ctrl.pItem1.length).toEqual(3);
        });

    });
});