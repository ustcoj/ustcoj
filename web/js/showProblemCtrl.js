app.controller("showProblemCtrl", function($scope, $http, $rootScope, $sce){

    $scope.update = function(){
    	$http.get($rootScope.apiHost + "/api/problem/" + $rootScope.probNumber)
        .then(function(response) {
            //alert(response.status);
            $scope.problemData = response.data;
            $scope.problemData.data.problem.description = $sce.trustAsHtml($scope.problemData.data.problem.description);
        });
    }

    $scope.update();

    $rootScope.$on('problemNumberChanged', function(event, data){
    	$rootScope.probNumber = data;
        $scope.update();
    }) 

});