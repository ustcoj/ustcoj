/**
 * Created by zhaohongzhu on 4/3/17.
 */
angular
    .module('ustc-oj')
    .controller("contestBoardCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){

        $scope.contestId = $routeParams.contest_ID;
        problemService.getContestBoard(function (response) {
            $scope.board = response;
        }, $scope.contestId)

        


    });
