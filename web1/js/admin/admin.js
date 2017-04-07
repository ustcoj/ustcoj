/**
 * Created by vollt on 2017/4/6.
 */

// $rootScope.addNewsUrl = "/api/admin/news/add";
// $rootScope.addProblemUrl = "/api/admin/problem/add";

angular
    .module('ustc-oj')
    .service('adminService', function($rootScope, $sce, userService, networkService, siteService) {

        this.Post = function(_url, _callback, _data) {
            networkService.handleRepData('post', _url, _data, null, null)
                .then(function (response) {
                    _callback(response.data);
                });
        };

        this.getNews = function(_callback, news_id) {
            // news = {
            //     'news_id' : news_id,
            //     'news_title' : 'news_titlenews_title',
            //     'news_content' : "news_contentnews_content",
            //     'news_excerpt' : "news_excerptnews_excerpt",
            //     'user_id' : 1,
            //     'news_index' : 1,
            //     'forbidden_status' : 0
            // };
            console.log(news)
            var data = Object();
            var news = Object();
            news.news_title = 'news_titlenews_title'
            news.news_excerpt = 'news_excerptnews_excerpt'
            news.news_content = 'news_contentnews_content'
            data.news = news;
            _callback(data);
        }

        this.addNews = function(_callback, _data) {
            Post($rootScope.addNewsUrl, _callback, _data);
        };

        this.addProblem = function (_callback, _data) {
            Post($rootScope.addProblemUrl, _callback, _data);
        }
    });