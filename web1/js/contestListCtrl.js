/**
 * Created by zhaohongzhu on 1/19/17.
 */

angular
    .module('ustc-oj')
    .controller("contestListCtrl", function($scope, $http, $rootScope, $window, problemService, siteService, userService, profileService){

        $scope.perpage = 10;
        $scope.pageNow = 1;
        $scope.ongoing = {};
        $scope.pending = {};

        $scope.updateUserData = function () {

        };

        profileService.getUserProfile(function (response) {
            $scope.updateUserData()
        }, userService.getUsername());

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
                $scope.finishLoading = true;
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
            problemService.registerContest(function(response) {
                siteService.showAlert("Register Success");
                $scope.updateUserData();
            }, contestId);
        };
});
