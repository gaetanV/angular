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
                    if(tscope.editItem.$valid===true){

                        $scope.pItem1[tscope.$index]=angular.copy(tscope.form);
                        $scope.quickModel="read";
                    };
                    
             };
        };
        
      $scope.pItem1 = [new cap(), new shirt(),new shirt()];
    }

})();