app.controller("showProblemCtrl", function($scope, $http, $rootScope, $sce, $routeParams){

    /*
    $scope.update = function(){
    	$http.get($rootScope.apiHost + "/api/problem/" + $rootScope.probNumber)
        .then(function(response) {
            //alert(response.status);
            $scope.problemData = response.data;
            $scope.problemData.data.problem.description = $sce.trustAsHtml($scope.problemData.data.problem.description);
        });
    };

    $scope.update();

    $rootScope.$on('problemNumberChanged', function(event, data){
    	$rootScope.probNumber = data;
        $scope.update();
    });
    */

    $http.get($rootScope.apiHost + "/api/problem/" + $routeParams.problem_ID)
        .then(function(response) {
            //alert(response.status);
            $scope.problemData = response.data;
            $scope.problemData.data.problem.description =
                $sce.trustAsHtml($scope.problemData.data.problem.description);
            $scope.problemData.data.problem.input =
                $sce.trustAsHtml($scope.problemData.data.problem.input_description);
            $scope.problemData.data.problem.output =
                $sce.trustAsHtml($scope.problemData.data.problem.output_description);
        });

});