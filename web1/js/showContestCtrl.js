angular
    .module('ustc-oj')
    .controller("showContestCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){

        $scope.finishLoading = false;

        if ($routeParams.contest_ID == null) {
            siteService.showAlert("Url error");
            $window.location.href = '#/contests/';
        }
        else {
            $scope.contestId = $routeParams.contest_ID;
        }

        problemService.getContestInfo(function(data){
            $scope.contestInfo = data;
            console.log(data);
            $scope.finishLoading = true;
        }, $routeParams.contest_ID);

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