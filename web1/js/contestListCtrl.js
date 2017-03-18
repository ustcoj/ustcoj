/**
 * Created by zhaohongzhu on 1/19/17.
 */

angular
    .module('ustc-oj')
    .controller("contestListCtrl", function($scope, $http, $rootScope, $window, problemService, siteService){

        $scope.perpage = 10;
        $scope.pageNow = 1;
        $scope.ongoing = {};
        $scope.pending = {};

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

            problemService.getContestList(function(data){
                $scope.contestList = data;
                $scope.contestList.contest_list.forEach(function (item) {

                })
            }, $scope.pageNow, $scope.perpage);

        };


        problemService.getSiteInfo(function (response) {
            $scope.contestNum = response.contest_number;
            $scope.pageSum = Math.ceil($scope.contestNum / $scope.perpage);
        });

        $scope.refreshPage();

        $scope.showContest = function(contestId){
            $window.location.href = siteService.contestLink + contestId;
        };

        $scope.registerContest = function(contestId) {

        };
});
