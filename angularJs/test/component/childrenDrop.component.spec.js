describe('childrenDrop', () => {

    var $CarsService;
    var $scope;
    var deferred;
    var ctrl;

    beforeEach(module('component-rest'));

    beforeEach(inject((_$q_, CarsService, $componentController, _$rootScope_) => {
        deferred = _$q_.defer();
        $scope = _$rootScope_.$new();
        $CarsService = CarsService;
        spyOn(CarsService, 'getCars').and.returnValue(deferred.promise);
        ctrl = $componentController('finder', {
            $scope: $scope,
            CarsService: $CarsService
        });
    }));

    describe('$scope', () => {
        it('CarsService is called', () => {
            $scope.$apply();
            expect($CarsService.getCars).toHaveBeenCalled();
        });
        it('CarsService set scope cars', () => {
            deferred.resolve(["test"]);
            $scope.$apply();
            expect($scope.$ctrl.cars).toEqual(["test"]);
        });
    });

});