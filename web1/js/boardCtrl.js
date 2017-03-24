/**
 * Created by zhaohongzhu on 3/22/17.
 */
angular
    .module('ustc-oj')
    .controller("boardCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){

        $scope.isContest = $routeParams.contest_ID;



        if (!$scope.isContest) problemService.getUserList(function (response) {
            $scope.userList = response.data;
        })

    });
