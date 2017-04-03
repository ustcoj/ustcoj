/**
 * Created by zhaohongzhu on 4/3/17.
 */
angular
    .module('ustc-oj')
    .controller("contestBoardCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){
        $scope.loading = 2;
        $scope.contestId = $routeParams.contest_ID;
        problemService.getContestBoard(function (response) {
            $scope.board = response;
            $scope.loading--;
        }, $scope.contestId);
        problemService.getContestInfo(function(data){
            $scope.contestInfo = data;
            $scope.loading--;
        }, $routeParams.contestId);

        $scope.getStatus = function (player, problem) {
            if (!player || !problem) return "board-single-null";
            if (!player.solved_problem || !player.trying_problem) return "board-single-null";
            if (player.solved_problem.indexOf(problem) != -1) return "board-single-solved";
            if (player.trying_problem.indexOf(problem) != -1) return "board-single-trying";
            return "board-single-null"
        }

    });
