/**
 * Created by vollt on 2017/4/6.
 */
angular
    .module('ustc-oj')
    .controller("editNewsCtrl", function ($routeParams, $scope, $http, $rootScope, $window,
                                      networkService, problemService, adminService) {
        $scope.news_ID = null;
        $scope.newsTitle = null;
        $scope.newsExcerpt = null;
        $scope.newsContent = null;
        $scope.author = null;
        $scope.problemEdit = null;
        $scope.finishLoading = false;

        if ($routeParams.news_ID == null) {

        }
        else {
            $scope.news_ID = $routeParams.news_ID;
            adminService.getNews(function(data){
                $scope.excerpt_editor = 'jack';
                $scope.content_editor = 'joe'
                console.log(data.news)
                $scope.Data = data;
                $scope.news = data.news;
                $scope.finishLoading = true;
            }, $scope.news_ID);
        }

        $scope.submitNews = function () {
            var problemData = {

            };
            adminService.getProblemData();
        }

    });