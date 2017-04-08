/**
 * Created by vollt on 2017/4/6.
 */

angular
    .module('ustc-oj')
    .service('adminService', function($rootScope, $sce, userService, networkService, siteService) {

        $rootScope.addNewsUrl = "/api/admin/news/add";
        $rootScope.addProblemUrl = "/api/admin/problem/add"
        $rootScope.addContestUrl = "/api/admin/contest/add"

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

        this.Populate = function(_source, _dest, _ignore) {
            _ignore = _ignore || [];
            for (var attrname in _source) {
                if (attrname in _ignore) {
                    continue;
                }
                _dest[attrname] = _source[attrname];
            }
        };

        this.arrayPopulate = function(_name, _source, _dest) {
            var i = 0;
            for (var _x in _source) {
                if (_source[_x] == null || _source[_x] == "") {
                    continue;
                }
                _dest[_name + "-" + i] = _source[_x]
                i++;
            }
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

        this.getProblem = function(_callback, _problem_id, _contest_id) {
            var url;
            if (_contest_id) {
                url = String.Format($rootScope.contestProblemUrl, _contest_id, _problem_id);
            }
            else {
                url = $rootScope.problemUrl + _problem_id;
            }
            this.Get(url, _callback)
        };

        this.getContest = function(_callback, _contest_id) {
            console.log("111")
            var url = $rootScope.contestUrl + _contest_id;
            this.Get(url, _callback)
        };

        this.addNews = function(_callback, _data) {
            this.Post($rootScope.addNewsUrl, _callback, _data);
        };

        this.addProblem = function (_callback, _data) {
            this.Post($rootScope.addProblemUrl, _callback, _data);
        }

        this.addContest = function (_callback, _data) {
            this.Post($rootScope.addContestUrl, _callback, _data);
        }
    });

angular
    .module('ustc-oj')
    .directive("inputText", function(){
        return {
            restrict: "A",
            scope:{
                title: "@",
                value: '=',
                disable: '@'
            },
            template : '<div class="form-group">' +
            '               <label class="col-sm-8 control-label">{{title}}</label>' +
            '                   <div class="col-sm-40">' +
            '                       <input ng-disabled="disable" ng-model="value" type="text" class="form-control">' +
            '                   </div>' +
            '           </div>'
        }
    });

angular
    .module('ustc-oj')
    .directive("inputEditor", function(){
        return {
            restrict: "A",
            scope:{
                title: "@",
                value: '='
            },
            template : '<div class="form-group">' +
            '               <label class="col-sm-24 control-label">{{title}}</label>' +
            '                   <div class="col-sm-48 submit-area">' +
            '                       <div simditor ng-model="value"></div>' +
            '                   </div>' +
            '           </div>'
        }
    });

angular
    .module('ustc-oj')
    .directive("inputPlainEditor", function(){
        return {
            restrict: "A",
            scope:{
                title: "@",
                value: '='
            },
            template : '<div class="form-group">' +
            '               <label class="col-sm-24 control-label">{{title}}</label>' +
            '                   <div class="col-sm-48">' +
            '                       <textarea ng-model="value"></textarea>' +
            '                   </div>' +
            '           </div>'
        }
    });

angular
    .module('ustc-oj')
    .directive("inputButton", function(){
        return {
            restrict: "A",
            scope:{
                title: "@",
                click: "="
            },
            link: function (scope) {
                scope.clickFunc = scope.click;
            },
            template : '<button class="btn btn-default btn-thin" ng-click="clickFunc()">' +
            '            {{title}}' +
            '           </button>'
        }
    })

angular
    .module('ustc-oj')
    .directive("inputSwitch", function(){
        return {
            restrict: "A",
            scope:{
                title: "@",
                on: "@",
                off: "@",
                value: '='
            },
            template : '<div class="form-group">' +
            '               <label class="col-sm-8 control-label">{{title}}</label>' +
            '               <div class="col-sm-40">' +
            '                   <div class="radio-inline">' +
            '                       <label>' +
            '                       <input type="radio" name="optionsRadios" id="optionsRadios0" ng-model="value" checked="{{0==valuw}}" value="0">' +
            '                       {{off}}' +
            '                       </label>' +
            '                   </div>' +
            '                   <div class="radio-inline">' +
            '                       <label>' +
            '                       <input type="radio" name="optionsRadios" id="optionsRadios1" ng-model="value" checked="{{1==valuw}}" value="1">' +
            '                       {{on}}' +
            '                       </label>' +
            '                   </div>' +
            '               </div>' +
            '           </div>'
        }
    })