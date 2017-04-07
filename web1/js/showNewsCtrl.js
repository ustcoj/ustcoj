/**
 * Created by zhaohongzhu on 4/7/17.
 */
/**
 * Created by zhaohongzhu on 4/7/17.
 */
/**
 * Created by zhaohongzhu on 1/19/17.
 */

angular
    .module('ustc-oj')
    .controller("showNewsCtrl", function($scope, $http, $rootScope, $routeParams, $window, problemService, siteService){

        $scope.newsId = $routeParams.news_ID;
        problemService.getNews(function(response) {
            $scope.newsInfo = response.news;
            $scope.finishLoading = true;
        }, $scope.newsId)
    });
