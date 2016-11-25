app.controller("showProblemCtrl", function($scope, $http, $rootScope, $sce){

    $http.get($rootScope.apiHost + "/api/problem/" + $rootScope.probNumber)
        .then(function(response) {
            //alert(response.status);
            $scope.problemData = response.data;
            $scope.problemData.data.problem.description = $sce.trustAsHtml($scope.problemData.data.problem.description);
        });

});