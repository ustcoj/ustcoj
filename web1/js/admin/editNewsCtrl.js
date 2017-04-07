/**
 * Created by vollt on 2017/4/6.
 */
angular
    .module('ustc-oj')
    .controller("editNewsCtrl", function ($routeParams, $scope, $http, $rootScope, $window,
                                      networkService, problemService, adminService) {
        $scope.news_id = null;
        $scope.newsTitle = null;
        $scope.newsExcerpt = null;
        $scope.newsContent = null;
        $scope.author = null;
        $scope.problemEdit = null;
        $scope.finishLoading = false;

        if ($routeParams.news_ID == null) {

        }
        else {
            $scope.news_id = $routeParams.news_ID;
            adminService.getNews(function(data){
                var news = data.news;
                console.log(news)
                $scope.news_id = $scope.news_id
                $scope.excerpt_editor = news.news_excerpt;
                $scope.content_editor = news.news_content
                $scope.news_title = news.news_title;
                $scope.finishLoading = true;
            }, $scope.news_id);
        }

        $scope.submitNews = function () {
            var newsData = {
                news_title: $scope.news_title,
                news_excerpt: $scope.excerpt_editor,
                news_content: $scope.content_editor
            };
            if ($scope.news_id)
                newsData["news_id"] = $scope.news_id
            adminService.addNews(function(data){
                $window.location.href = '#/';
            }, newsData);
        }

    });