(function() {
    'use strict';

    angular
            .module('app.ngDrag')
            .controller('NgDrag', NgDrag);

    NgDrag.$inject = ['$scope'];
    
    function NgDrag($scope) {
       
        $scope.pItem1 = [new cap(), new shirt(),new shirt()];
        $scope.pItem2 = [new cap(), new cap(),new shoe()];

       $scope.remove = function(list, $index) {
              console.log("remove");
            list.splice($index, 1);
        }
        
        $scope.add = function(list, item) {
            console.log("add");
              console.log(item);
            if (list.indexOf(item) == -1)  {list.push(item) }else{
                console.log( "item in collection exist >> add a copy"  );
            
                list.push(angular.copy(item)) 
              
            }
        };
        $scope.isValid=function($transport){
            return $transport.name=="cap";
        }
    }

})();