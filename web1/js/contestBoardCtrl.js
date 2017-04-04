/**
 * Created by zhaohongzhu on 4/3/17.
 */
angular
    .module('ustc-oj')
    .controller("contestBoardCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){
        $scope.contestSortIndex = "Penalty";
        $scope.loading = 2;
        $scope.contestType = 0;
        $scope.contestId = $routeParams.contest_ID;
        problemService.getContestBoard(function (response) {
            $scope.board = response;
            $scope.loading--;
        }, $scope.contestId);
        problemService.getContestInfo(function(data){
            $scope.contestInfo = data;
            $scope.contestType = data.contest_type;
            if (data.contest_type != 0) {
                $scope.contestSortIndex = "Index";
            }
            $scope.loading--;
        }, $scope.contestId);

        $scope.getStatus = function (player, problem) {
            if (!player || !problem) return "board-single-null";
            if (!player.solved_problem || !player.trying_problem) return "board-single-null";
            // console.log(player.info[problem]);
            if (!player.info[problem]) return "board-single-null";
            if (player.solved_problem.indexOf(problem) != -1) return "board-single-solved";
            if (player.trying_problem.indexOf(problem) != -1) return "board-single-trying";
            return "board-single-null"
        };

        $scope.gotoContestProblem = function (contestId, problem) {
            $window.location.href = String.Format(siteService.contestProblemLink, contestId, problem)
        };

    });
