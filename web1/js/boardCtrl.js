/**
 * Created by zhaohongzhu on 3/22/17.
 */
angular
    .module('ustc-oj')
    .controller("boardCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){

        if ($routeParams.contest_ID == null) {
            siteService.showAlert("Url error");
            $window.location.href = '#/contests/';
        }
        else {
            $scope.contestId = $routeParams.contest_ID;
        }


    });
