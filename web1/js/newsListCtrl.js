/**
 * Created by zhaohongzhu on 4/7/17.
 */
/**
 * Created by zhaohongzhu on 1/19/17.
 */

angular
    .module('ustc-oj')
    .controller("newsListCtrl", function($scope, $http, $rootScope, $window, problemService, siteService){

        $scope.perpage = 10;
        $scope.pageNow = 1;

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

            problemService.getNewsList(function(data){
                console.log(data);
                $scope.newsList = data.news_list;
                $scope.newsList.forEach(function (item) {

                });
                $scope.finishLoading = true;
            }, $scope.pageNow, $scope.perpage);

        };


        problemService.getSiteInfo(function (response) {
            $scope.newsNum = response.news_number;
            $scope.pageSum = Math.ceil($scope.newsNum / $scope.perpage);
        });

        $scope.refreshPage();

        $scope.showNews = function(newsId){
            $window.location.href = siteService.NewsLink + newsId;
        };
    });
