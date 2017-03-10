/**
 * Created by zhaohongzhu on 1/19/17.
 */

angular
    .module('ustc-oj')
    .controller("contestListCtrl", function($scope, $http, $rootScope, $window, problemService, siteService){

    problemService.getContestList(function(data){$scope.contestList = data}, 1, 10);

    $scope.showContest = function(contestId){
        $window.location.href = siteService.contestLink + contestId;
    }
});
