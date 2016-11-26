app.controller("problemListCtrl", function($scope, $http, $rootScope){

    $http.get($rootScope.apiHost + "/api/problem", {params: {
        page: 1,
        per_page: 5
    }})
        .then(function(response) {
            //alert(response.status);
            $scope.problemList = response.data;
        });

    $scope.show_prob = function($prob_id){
    	$rootScope.$broadcast('problemNumberChanged', $prob_id);
		$rootScope.tabShow = "showProblem";
    }
});