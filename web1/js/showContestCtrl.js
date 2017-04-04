angular
    .module('ustc-oj')
    .controller("showContestCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService, userService){

        $scope.finishLoading = false;
        $scope.myTrying = {};
        $scope.mySolved = {};

        if ($routeParams.contest_ID == null) {
            siteService.showAlert("Url error");
            $window.location.href = '#/contests/';
        }
        else {
            $scope.contestId = $routeParams.contest_ID;
        }

        problemService.getContestInfo(function(data){
            $scope.contestInfo = data;
            $scope.finishLoading = true;
        }, $routeParams.contest_ID);

        if (userService.isLoggedIn()) {
            problemService.getContestSingleStatus(function (response) {
                // console.log(response);
                response.contest_player.solved_problem.forEach(function (item) {
                    $scope.mySolved[item] = true;
                });
                response.contest_player.trying_problem.forEach(function (item) {
                    $scope.myTrying[item] = true;
                })
            }, $routeParams.contest_ID, userService.getUserid());
        }

        $scope.showContestProblem = function(problemSeq){
            $window.location.href = '#/contests/' + $routeParams.contest_ID + '/problems/' + problemSeq + '/';
        };


        $scope.gotoBoard = function () {
            $window.location.href = '#/contests/' + $scope.contestId + '/board/';
        };

        $scope.gotoSubmit = function () {
            $window.location.href = '#/contests/' + $scope.contestId + '/submit/';
        };

        $scope.gotoStatus = function() {
            $window.location.href = '#/contests/' + $scope.contestId + '/status/';
        }


    });