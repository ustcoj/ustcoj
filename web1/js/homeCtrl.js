angular
    .module('ustc-oj')
    .controller("homeCtrl", function($scope, $http, $window, $rootScope, $routeParams, problemService, userService, profileService){

    $scope.newsLoaded = false;
    $scope.recentContestLoaded = false;
    $scope.siteInfoLoaded = false;
    $scope.userId = userService.getUserid();
    $scope.isLoggedIn = userService.isLoggedIn();
    $scope.registered = {};

    problemService.getNewsList(function (response) {
        $scope.newsList = response.news_list;
        $scope.newsLoaded = true;
    }, 1, 3);

    problemService.getContestList(function (response) {
        $scope.contestList = response.contest_list;
        $scope.recentContestLoaded = true;
    }, 1, 4);

    problemService.getSiteInfo(function (response) {
        $scope.siteInfo = response;
        $scope.siteInfoLoaded = true;
    });

    if (userService.isLoggedIn()) {
        profileService.getRegisteredList(function (response) {
            response.contest_list.forEach(function (item) {
                $scope.registered[item] = true;
            });
        }, userService.getUsername());
    }
    
    $scope.getTimeInterval = function (contest) {
        if (!contest) return 0;
        var end = new Date(contest.end_time);
        var start = new Date(contest.start_time);
        return (end - start);
    }


});