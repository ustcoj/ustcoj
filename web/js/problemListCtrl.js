angular
    .module('ustc-oj')
    .controller("problemListCtrl", function($scope, $http, $rootScope, $window, profileService, problemService, userService){

    $scope.myTrying = {};
    $scope.mySolved = {};
    if (userService.isLoggedIn()) {
        profileService.getUserProfile(function (response) {
            response.data.solved_problem.forEach(function (item) {
                $scope.mySolved[item] = true;
            });
            response.data.trying_problem.forEach(function (item) {
                //$scope.myTrying[item] = true;
            })
        }, userService.getUsername())
    }

    problemService.getProblemList(function(data){
        $scope.problemList = data
    }, 1, 10);

    $scope.showProblem = function(problemId){
        $window.location.href = '#/problems/' + problemId;
    }
});
