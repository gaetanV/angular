(function() {
    'use strict';

    angular
            .module('app.ngDrag')
            .controller('NgDrag', NgDrag);

    NgDrag.$inject = ['$scope'];
    
    function NgDrag(scope) {
       
        scope.pItem1 = [new cap(), new shirt(),new shirt()];
        scope.pItem2 = [new cap(), new cap(),new shoe()];

       scope.remove = function(list, $index) {
            list.splice($index, 1);
        }
        scope.add = function(list, item) {
            if (list.indexOf(item) == -1)  list.push(item);
        };
    }

})();