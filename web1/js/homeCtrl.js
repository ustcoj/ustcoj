angular
    .module('ustc-oj')
    .controller("homeCtrl", function($scope, $http, $window, $rootScope, $routeParams, problemService, userService, siteService){

    $scope.newsLoaded = false;
    $scope.recentContestLoaded = false;
    $scope.siteInfoLoaded = false;
    $scope.userId = userService.getUserid();
    $scope.isLoggedIn = userService.isLoggedIn();

    problemService.getNewsList(function (response) {
        $scope.newsList = response.news_list;
        $scope.newsLoaded = true;
    }, 1, 3);

    problemService.getContestList(function (response) {
        $scope.contestList = response;
        $scope.recentContestLoaded = true;
    }, 1, 5);

    problemService.getSiteInfo(function (response) {
        $scope.siteInfo = response;
        $scope.siteInfoLoaded = true;
    })


});