/**
 * Created by zhaohongzhu on 3/22/17.
 */
angular
    .module('ustc-oj')
    .controller("rankCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService){

        $scope.isContest = $routeParams.contest_ID;
        $scope.perpage = 20;
        $scope.pageNow = 1;

        problemService.getSiteInfo(function (response) {
            $scope.userNum = response.user_number;
            $scope.pageSum = Math.ceil($scope.userNum / $scope.perpage);
        });

        $scope.catchEnter = function(_event) {
            if (_event.which === 13) {
                $scope.refreshPage();
            }
        };
        $scope.pageOffset = function (_offset) {
            $scope.pageNow = Number($scope.pageNow);
            if ($scope.pageNow) {
                if (_offset + $scope.pageNow >= 1 && _offset + $scope.pageNow <= $scope.pageSum) {
                    $scope.pageNow += _offset;
                }
                $scope.refreshPage();
            }
        };

        $scope.refreshPage = function () {
            problemService.getUserList(function (response) {
                $scope.userList = response.data;
                $scope.finishLoading = true;
            }, $scope.pageNow, $scope.perPage);
        };

        $scope.refreshPage();

    });
