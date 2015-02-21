(function() {
    'use strict';

    angular
            .module('app.quickEdit')
            .controller('QuickEdit', QuickEdit);

    QuickEdit.$inject = ['$scope'];
    
    function QuickEdit($scope) {
        
        
        $scope.clone=function(tscope){

             tscope.form=angular.copy(tscope.item);
             
             tscope.submit=function(){
                     tscope.item=angular.copy(tscope.form);
                     tscope.model="read";
             };
            
        };
        
      $scope.pItem1 = [new cap(), new shirt(),new shirt()];
    }

})();