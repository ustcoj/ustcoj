/**
 * Created by vollt on 2017/4/6.
 */

angular
    .module('ustc-oj')
    .service('adminService', function($rootScope, $sce, userService, networkService, siteService) {

        $rootScope.addNewsUrl = "/api/admin/news/add";

        this.Post = function(_url, _callback, _data) {
            networkService.handleRepData('post', _url, _data, null, null)
                .then(function (response) {
                    _callback(response.data);
                });
        };

        this.Get = function(_url, _callback) {
            networkService.handleRepData('get', _url, null, null, null)
                .then(function (response) {
                    _callback(response.data);
                });

        };

        this.getNews = function (call_back, _news_id) {
            networkService.handleRepData('get', $rootScope.newsUrl + _news_id, null, null, null)
                .then(function (response) {
                    if (response.data.news) {
                        // response.data.news.news_excerpt = $sce.trustAsHtml(response.data.news.news_excerpt);
                        // response.data.news.news_content = $sce.trustAsHtml(response.data.news.news_content);
                    }
                    call_back(response.data);
                })
        };

        this.getProblem = function(_callback, problemId, _contest_id) {
            var url;
            if (_contest_id) {
                url = String.Format($rootScope.contestProblemUrl, _contest_id, problemId);
            }
            else {
                url = $rootScope.problemUrl + problemId;
            }
            this.Get(url, _callback)
        };

        this.addNews = function(_callback, _data) {
            this.Post($rootScope.addNewsUrl, _callback, _data);
        };

        this.addProblem = function (_callback, _data) {
            this.Post($rootScope.addProblemUrl, _callback, _data);
        }
    });