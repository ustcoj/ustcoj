app.controller("showContestCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService){

    $scope.finishLoading = false;

    problemService.getContestInfo(function(data){
        $scope.contestInfo = data;
        $scope.finishLoading = true;
    }, $routeParams.contest_ID);

    $scope.showContestProblem = function(problemSeq){
        /*
         $rootScope.$broadcast('problemNumberChanged', $prob_id);
         $rootScope.tabShow = "showProblem";
         */
        $window.location.href = '#/contests/' + $routeParams.contest_ID + '/problem/' + problemSeq;
    }

});