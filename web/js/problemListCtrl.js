app.controller("problemListCtrl", function($scope, $http, $rootScope, $window, problemService){

    /*
    $http.get($rootScope.apiHost + "/api/problem", {params: {
        page: 1,
        per_page: 10
    }})
        .then(function(response) {
            //alert(response.status);
            $scope.problemList = response.data;
        });
    */
    problemService.getProblemList(function(data){$scope.problemList = data}, 1, 10);

    $scope.show_prob = function(prob_id){
        /*
    	$rootScope.$broadcast('problemNumberChanged', $prob_id);
		$rootScope.tabShow = "showProblem";
		*/
        $window.location.href = '#/problems/' + prob_id;
    }
});
