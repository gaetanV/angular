(function() {
    'use strict';
    angular
            .module('app.finder')
            .controller('Finder', Finder);

      Finder.$inject = ['$scope'];
    
      function Finder($scope) {
          $scope.user={};
          $scope.user.Car=1;
            $scope.friends = 
                        [{name:'John', phone:'555-1276'},
                         {name:'Mary', phone:'800-BIG-MARY'},
                         {name:'Mike', phone:'555-4321'},
                         {name:'Adam', phone:'555-5678'},
                         {name:'Julie', phone:'555-8765'},
                         {name:'Juliette', phone:'555-5678'}];
                     
      };
        
})();