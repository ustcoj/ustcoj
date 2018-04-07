// Directed by Li Ding

String.Format = function (format, Args) {
    var args = arguments;
    var replaceObj = {};
    var i = 1;
    if (typeof Args === "object") {
        for (var prop in Args) {
            format = format.replace(new RegExp("{" + prop + "}", "g"), Args[prop]);
        }
        return format;
    } else {
        if (args.length > 1) {
            for (; i < args.length; i++) {
                replaceObj["{" + (i - 1) + "}"] = args[i];
            }
        }
        return format.replace(/\{\d+\}/g, function (resourse) {
            return replaceObj[resourse];
        });
    }
};

angular.module("ustc-oj", ['ngRoute', 'ngCookies', 'simditor']);

angular
    .module('ustc-oj')
    .config(function ($locationProvider) {
        //$locationProvider.html5Mode(true);
    });

angular
    .module('ustc-oj')
    .directive('modalDialog', function () {
        return {
            restrict: 'A',
            scope: {
                show: '=',
                title: '@'
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'>\
            <div class='ng-modal-overlay' ng-click='hideModal()'></div>\
            <div class='ng-modal-dialog' ng-style='dialogStyle'>\
                <div class='inf-board inf-board-info inf-board-no-border'>\
                    <div class='inf-board-title small-title-font'>{{title}}</div>\
                    <div class='inf-board-content' ng-transclude></div>\
                </div>\
            </div>\
            </div>"
        };
    });


angular
    .module('ustc-oj')
    .directive('focusOnShow', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                if ($attr.ngShow) {
                    $scope.$watch($attr.ngShow, function (newValue) {
                        if (newValue) {
                            $timeout(function () {
                                $element[0].focus();
                            }, 0);
                        }
                    })
                }
                if ($attr.ngHide) {
                    $scope.$watch($attr.ngHide, function (newValue) {
                        if (!newValue) {
                            $timeout(function () {
                                $element[0].focus();
                            }, 0);
                        }
                    })
                }

            }
        };
    });

angular
    .module('ustc-oj')
    .directive('upload', ['$http', function ($http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            require: '?ngModel',
            template: '<div class="asset-upload">Drag here to upload</div>',
            link: function (scope, element, attrs, ngModel) {

                // Code goes here

            }
        };
    }]);

angular
    .module('ustc-oj')
    .directive('customOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    });

angular
    .module('ustc-oj')
    .run(function ($rootScope, $window) {
        $rootScope.ustcSuffix = ".ustc.edu.cn";
        var apiHostBody = "ustcoj.applinzi.com";
        //$rootScope.apiHost = "http://106.14.46.189";
        $rootScope.apiHost = ('https:' == document.location.protocol ? 'https://' : 'http://') + apiHostBody;
        $rootScope.siteRankUrl = "/api/user/";
        $rootScope.newsUrl = "/api/news/";
        $rootScope.loginUrl = "/api/user/login";
        $rootScope.registerUrl = "/api/user/register";
        $rootScope.problemListUrl = "/api/problem/";
        $rootScope.problemUrl = "/api/problem/";
        $rootScope.contestListUrl = "/api/contest/";
        $rootScope.contestUrl = "/api/contest/";
        $rootScope.contestStatusUrl = "/api/contest/{0}/status";
        $rootScope.contestBoardUrl = $rootScope.contestUrl + "{0}" + "/board";
        $rootScope.contestProblemUrl = $rootScope.contestUrl + "{0}" + "/problem/" + "{1}";
        $rootScope.contestSingleUrl = $rootScope.contestUrl + "{0}" + "/player/" + "{1}";
        $rootScope.registeredContestListUrl = "/api/user/contest_list";
        $rootScope.registerContestUrl = $rootScope.contestListUrl + "{0}" + "/register";
        $rootScope.submitUrl = "/api/submission/";
        $rootScope.statusUrl = "/api/submission/";
        $rootScope.profileUrl = "/api/user/profile/";
        $rootScope.problemSimpleUrl = $rootScope.problemUrl + "{0}" + "/simple";
        $rootScope.siteInfoUrl = '/api/server/status';
        $rootScope.userAvatar = '/';
        $rootScope.verifyEmailUrl = '/api/user/verify_email';
        $rootScope.newsUrl = '/api/news/';
        $rootScope.myContestStatusUrl = $rootScope.contestUrl + "{0}" + "/submission";
        $rootScope.getServerTimeUrl = "/api/server/time";
        $rootScope.bindIdUrl = "/api/user/bind_id";

        // sourcetag
        $rootScope.sourcetagTaskUrl = "/api/sourcetag/";


        $rootScope.fullTime = 'yyyy-MM-dd HH:mm:ss';
        $rootScope.articleDate = 'yyyy - MM - dd';
        $rootScope.hourAndMinute = 'HH : mm';
        $rootScope.serverTimezone = 8;
        $rootScope.autoAdjustTime = true;

        $rootScope.tempConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
    });

angular
    .module('ustc-oj')
    .filter('bytes', function () {
        return function (bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 0;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        }
    });

angular
    .module('ustc-oj')
    .filter('time_interval', function () {
        return function (millis, precision) {
            if (isNaN(parseFloat(millis)) || !isFinite(millis)) return '-';
            var units = ['ms', 's', 'min', 'h', 'day', 'month', 'year'];
            var t = [1000, 60, 60, 24, 30, 12, 10000000];
            var i = 0;
            while (millis / t[i] >= 1) {
                millis /= t[i];
                i++;
            }
            if (typeof precision === 'undefined') {
                if (i == 3) {
                    precision = 1;
                }
                else precision = 0;
            }
            var ret = millis.toFixed(precision);
            var retString = ret + ' ' + units[i];
            if (i >= 4 && ret > 1) retString += 's';
            return retString;
        }
    });

angular
    .module('ustc-oj')
    .filter('contest_sort', function () {
        return function (seconds, contest_type) {
            if (isNaN(parseFloat(seconds)) || !isFinite(seconds) || seconds == -1) return '-';
            if (contest_type != 0) return seconds;
            if (typeof precision === 'undefined') precision = 0;
            return Math.floor(seconds / 60);
        }
    });


angular
    .module('ustc-oj')
    .service('networkService', function ($rootScope, $http, $q, userService, $filter, siteService) {

        var addDefaultHeader = function (header) {
            header['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';
            return header;
        };

        var refreshHeader = function (header, url) {
            var time = siteService.getTime();
            var userid = userService.getUserid();
            var token = userService.getToken();
            url = $rootScope.apiHost + url;
            // console.log(url);
            header['Time'] = time;
            if (userid) {
                header['Userid'] = userid;
            }
            if (userid && token) {
                var tmp = url + time + userid.toString() + token;
                // console.log(tmp);
                header['Sign'] = MD5(window.btoa(tmp));
            }
        };

        this.handleRepData = function (method, url, data, config, extraHeader, error_callback) {
            // console.log(error_callback);
            if (error_callback == true) error_callback = function (res) {
                return true;
            };
            else if ((typeof error_callback) != "function") error_callback = function (res) {
                return false;
            };

            var promise;
            var defer = $q.defer();
            if (config == null) {
                config = {}
            }
            if (extraHeader == null) {
                extraHeader = {}
            }

            if (config.hasOwnProperty("params")) {
                config.params["ut"] = siteService.getTime();
            }
            else {
                config["params"] = {"ut": siteService.getTime()}
            }
            switch (method) {
                case 'get':
                    header = extraHeader;
                    addDefaultHeader(header);
                    refreshHeader(header, url);
                    realUrl = $rootScope.apiHost + url;
                    realConfig = config;
                    realConfig.headers = header;
                    promise = $http.get(realUrl, realConfig);
                    break;

                case 'post':
                    header = extraHeader;
                    dataTosend = $.param(data);
                    addDefaultHeader(header);
                    refreshHeader(header, url);
                    realUrl = $rootScope.apiHost + url;
                    realConfig = config;
                    realConfig.headers = header;
                    promise = $http.post(realUrl, dataTosend, realConfig);
                    break;

                case 'put':
                    promise = $http.put(url, data, config);
                    break;

                case 'delete':
                    promise = $http.delete(url, config)
            }

            promise.then(function (rep) {

                if (siteService.checkResponse(rep, error_callback)) {
                    defer.resolve(rep.data);
                }

            }, function () {
                defer.reject('HTTP request failed. Please try again.');
            });

            return defer.promise;
        };

    });

angular
    .module('ustc-oj')
    .service('siteService', function ($rootScope, $routeParams, $filter, $location, $window, $route, $cookies, $http) {

        this.homeLink = '#/';
        this.loginLink = '#/login/';
        this.profileLink = '#/profile/';
        this.problemLink = '#/problems/';
        this.contestLink = '#/contests/';
        this.statusLink = '#/status/';
        this.contestStatusLink = '#/contests/{0}/status/';
        this.rankLink = '#/rank/';
        this.contestBoardLink = '#/contests/{0}/board/';
        this.submitLink = '#/submit/';
        this.contestSubmitLink = '#/contests/{0}/submit/';
        this.contestSubmissionLink = '#/contests/{0}/status/{1}/';
        this.contestProblemLink = '#/contests/{0}/problems/{1}';
        this.editLink = '#/edit/';
        this.newsLink = '#/news/';
        this.bindIdLink = '#/bind/';
        this.sourcetagTaskLink = "#/sourcetag/";
        this.bindDestination = encodeURIComponent($location.protocol() + "://" + location.host + "/" + this.bindIdLink);
        this.errorMsg = {
            "411": "Invalid username or wrong password",
            "412": "Your email address has already been verified",
            "413": "Login required",
            "414": "Verification code expired. Please resend an email",
            "415": "Failed to submit: ",
            "416": "No such user",
            "417": "Cannot fetch job from redis queue",
            "418": "Failed to load this problem",
            "419": "Failed to load this submission",
            "420": "Sorry, cannot access this submission",
            "421": "Failed to load this contest",
            "422": "Calm down~ You are submitting too fast",
            "423": "To submit a new problem, please contact us",
            "424": "Please verify your email address",
            "425": "Privilege required",
            "426": "Please register to this contest first",
            "427": "Seems that you have already registered",
            "428": "Contest has not begun yet",
            "429": "Contest has ended",
            "430": "Authentication failed. Re-login may solve this problem",
            "431": "Please wait a while to resend another email",
            "432": "News not found",
            "433": "Incorrect code. Please try again",
            "434": "Wrong contest password",
            "435": "Seems that you have already bound a USTC ID",
            "436": "Failed to bind with this ID",
            "437": "This ID has already been bound to an account",
            "438": "This language cannot be used at this time",
            "450": "Bind your school ID first."
        };

        this.reload = function () {
            $route.reload();
        };

        this.atUSTC = function () {
            var host = $location.host();
            var pos = host.indexOf($rootScope.ustcSuffix);
            return (pos !== -1 && pos + $rootScope.ustcSuffix.length === host.length);
        };

        this.languageCode = ["gcc -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c99 {src_path} -lm -o {exe_path}",
            "g++ -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c++11 {src_path} -lm -o {exe_path}",
            "python -m py_compile {src_path}", "", ""];

        this.goBack = function () {
            var nowUrl = $location.path();

            nowUrl = nowUrl.substr(0, nowUrl.lastIndexOf('/'));
            nowUrl = nowUrl.substr(0, nowUrl.lastIndexOf('/') + 1);
            console.log(nowUrl);
            $window.location.href = '#' + nowUrl;
        };

        this.showAlert = function (message, type, closeDelay) {

            closeDelay = closeDelay || 8000;

            if ($("#alerts-container").length == 0) {
                // alerts-container does not exist, create it
                $("body")
                    .append($("<div id=\"alerts-container\" style=\"position: fixed;width: 50%; left: 25%; bottom: 10%;z-index: 100001\">"));
            }

            // default to alert-info; other options include success, warning, danger
            type = type || "warning";

            // create the alert div
            var alert = $('<div class="alert alert-' + type + ' fade in">')
                .append(
                    $('<button type="button" class="close" data-dismiss="alert">')
                        .append("&times;")
                )
                .append(message);

            // add the alert div to top of alerts-container, use append() to add to bottom
            $("#alerts-container").prepend(alert);

            // if closeDelay was passed - set a timeout to close the alert
            if (closeDelay)
                window.setTimeout(function () {
                    alert.alert("close")
                }, closeDelay);
        };

        this.adjustTime = function () {
            response = $http.get($rootScope.apiHost + $rootScope.getServerTimeUrl, $rootScope.tempConfig)
                .then((function (response) {
                    if (this.checkResponse(response)) {
                        serverTime = new Date(response.data.data.time);
                        var utc = new Date();
                        var offset = utc.getTimezoneOffset() + utc.getMinutes();
                        serverTime.setMinutes(offset);
                        cookieSaving("time_offset", this.getTime(true) - serverTime);
                        //console.log(offset, utc, this.getTime(true));
                    }

                }).bind(this));
        };

        this.getTime = function (pure) {
            pure = pure | false;
            var offsetWithServer = $cookies.get("time_offset") || 0;
            var utc = new Date();
            if (!pure) {
                utc.setMilliseconds(-offsetWithServer);
            }
            var offset = utc.getTimezoneOffset();
            var utc8 = utc;
            var minute = 60 * $rootScope.serverTimezone + offset + utc8.getMinutes();
            utc8.setMinutes(minute);
            if (!pure)
                return $filter('date')(utc8, 'yyyyMMddHHmmss');
            else return utc8;
        };

        this.checkErrorCode = function (code) {
            if (code == 413) {
                $window.location.href = this.loginLink;
            }
            if (code == 430) {
                this.adjustTime();
            }
        };

        this.checkResponse = function (response, error_callback) {
            //console.log(response);
            response = response.data;
            if (error_callback == true) error_callback = function (res) {
                return true;
            };
            else if ((typeof error_callback) != "function") error_callback = function (res) {
                return false;
            };

            var no_warning = error_callback(response)

            if (response == null) {
                if (!no_warning) this.showAlert("No response, the server might be down.");
                return false;
            }
            if (response.status == null) {
                if (!no_warning) this.showAlert("Server error.");
                return false;
            }
            if (response.status.code != 0) {
                if (response.status.code == "415") {

                    if (!no_warning) this.showAlert(this.errorMsg[response.status.code] + response.status.message);
                }
                else {
                    if (!no_warning) this.showAlert("Error: " + this.errorMsg[response.status.code]);
                }
                this.checkErrorCode(response.status.code);
                return false;
            }
            return true;
        };

    });

angular
    .module('ustc-oj')
    .service('problemService', function ($rootScope, $sce, userService, networkService, siteService) {

        this.getSiteInfo = function (save_siteInfo) {

            networkService.handleRepData('get', $rootScope.siteInfoUrl, null, null, null)
                .then(function (response) {
                    save_siteInfo(response.data);
                });

        };

        this.getProblemData = function (show_problemData, problemId, _contest_id) {

            var url;
            if (_contest_id) {
                url = String.Format($rootScope.contestProblemUrl, _contest_id, problemId);
            }
            else {
                url = $rootScope.problemUrl + problemId;
            }

            networkService.handleRepData('get', url, null, null, null)
                .then(function (response) {
                    show_problemData(resolveProblemData(response.data));
                });

        };

        // this.languageList = ["GCC", "G++", "Python 2.7", "Python 3.5", "Java"];
        this.languageList = {
            "0": "C",
            "1": "C++",
            "2": "Python 2.7",
            "3": "Python 3.4",
            "4": "Java",
            "5": "Haskell",
            "6": "JavaScript"
        };

        this.resultList = {
            "0": "Accepted",
            "-1": "Wrong Answer",
            "1": "Time Limit Exceeded",
            "2": "Time Limit Exceeded",
            "3": "Mem Limit Exceeded",
            "4": "Runtime Error",
            "5": "System Error",
            "6": "Compile Error",
            "7": "Pending",
            "8": "Judge Failed"
        };
        this.contestType = {
            "0": "ACM Contest",
            "5": "Speed First"
        };
        this.checkValidProblemId = function (content) {
            return (
                Number(content).toString() === content
                && Number(content) >= 1000
                && Number(content) <= 9999
            );
        };

        resolveProblemData = function (data) {

            console.log(data);

            data.problem.description =
                $sce.trustAsHtml(data.problem.description);
            data.problem.input_description =
                $sce.trustAsHtml(data.problem.input_description);
            data.problem.output_description =
                $sce.trustAsHtml(data.problem.output_description);
            data.problem.hint =
                $sce.trustAsHtml(data.problem.hint);

            //str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
            var len = data.problem.input_sample.length;
            for (i = 0; i < len; i++) {
                //if (data.problem.input_sample[i]) data.problem.input_sample[i] = $sce.trustAsHtml(data.problem.input_sample[i].replace(/(?:\r\n|\r|\n)/g, '<br />'));
                //if (data.problem.output_sample[i]) data.problem.output_sample[i] = $sce.trustAsHtml(data.problem.output_sample[i].replace(/(?:\r\n|\r|\n)/g, '<br />'));
            }
            return data;

        };

        this.getProblemList = function (show_problemList, _page, _per_page) {

            param = {
                page: _page,
                per_page: _per_page
            };
            networkService.handleRepData('get', $rootScope.problemListUrl, null, {params: param}, null)
                .then(function (response) {

                    show_problemList(response.data);
                });

        };

        this.getSimpleProblem = function (show_simpleProblem, _problem_id) {

            networkService.handleRepData('get', String.Format($rootScope.problemSimpleUrl, _problem_id)
                , null, null, null, true)
                .then(function (response) {

                    show_simpleProblem(response.data);
                });

        };

        this.getContestList = function (show_contestList, _page, _per_page) {

            param = {
                page: _page,
                per_page: _per_page
            };
            networkService.handleRepData('get', $rootScope.contestListUrl, null, {params: param}, null)
                .then(function (response) {

                    show_contestList(response.data);
                });

        };

        this.getContestStatus = function (call_back, _contest_id) {
            networkService.handleRepData('get', String.Format($rootScope.contestStatusUrl, _contest_id), null, null, null)
                .then(function (response) {
                    call_back(response.data);
                });

        };

        this.registerContest = function (updateRegisterStatus, contestId, _password, error_callback) {
            payload = {
                "password": _password || ""
            };
            networkService.handleRepData('post', String.Format($rootScope.registerContestUrl, contestId), payload, null, null, error_callback)
                .then(function (response) {
                    updateRegisterStatus(response);
                })
        };

        this.getContestInfo = function (show_contestInfo, _contestid, doNotBroadCast) {

            doNotBroadCast = doNotBroadCast || false;
            networkService.handleRepData('get', $rootScope.contestListUrl + _contestid, null, null, null)
                .then(function (response) {
                    response.data.description = $sce.trustAsHtml(response.data.description);
                    response.data.mode_msg = $sce.trustAsHtml(response.data.mode_msg);
                    show_contestInfo(response.data);
                    if (!doNotBroadCast) {
                        $rootScope.root_currentContest = response.data;
                    }
                });

        };

        this.submitCode = function (submit_complete, _submission_data) {
            networkService.handleRepData('post', $rootScope.submitUrl, _submission_data, null, null)
                .then(function (response) {
                    submit_complete(response.data);
                });
        };

        this.getSubmissonInfo = function (show_submissionInfo, _submissoinid) {
            networkService.handleRepData('get', $rootScope.statusUrl + _submissoinid, null, null, null)
                .then(function (response) {

                    if (response.data.hasOwnProperty("info")) {
                        if (typeof response.data.info.data === "string" || response.data.info.data instanceof String) {
                            // response.data.info.data = $sce.trustAsHtml(response.data.info.data.replace(/(?:\r\n|\r|\n)/g, '<br />'))
                        }
                    }

                    show_submissionInfo(response.data);

                });
        };

        this.getStatusList = function (show_statusList, _page, _per_page, _contestId, _filter) {

            param = {
                page: _page,
                per_page: _per_page
            };
            if (_filter["user"]) {
                param["user_id"] = _filter["user"];
            }
            var url;
            if (_contestId) {
                url = String.Format($rootScope.myContestStatusUrl, _contestId);
            }
            else {
                url = $rootScope.statusUrl;
            }
            networkService.handleRepData('get', url, null, {params: param}, null)
                .then(function (response) {
                    show_statusList(response);
                });

        };

        this.getContestSingleStatus = function (show_contestStatus, _contestId, _username) {
            networkService.handleRepData('get', String.Format($rootScope.contestSingleUrl, _contestId, _username), null, null, null)
                .then(function (response) {
                    show_contestStatus(response.data);
                });
        };


        this.getUserList = function (showUserList, _page, _per_page) {
            param = {
                "page": _page,
                "per_page": _per_page
            };
            networkService.handleRepData('get', $rootScope.siteRankUrl, null, {params: param}, null)
                .then(function (response) {
                    showUserList(response);
                })
        };

        this.getContestBoard = function (show_contestBoard, _contestId) {
            var url = String.Format($rootScope.contestBoardUrl, _contestId);
            networkService.handleRepData('get', url, null, null, null)
                .then(function (response) {
                    show_contestBoard(response.data);
                })
        };

        this.getNewsList = function (show_news, _page, _per_page) {
            param = {
                "page": _page,
                "per_page": _per_page
            };
            networkService.handleRepData('get', $rootScope.newsUrl, null, {params: param}, null)
                .then(function (response) {
                    for (var i = 0; i < response.data.news_list.length; i++) {
                        response.data.news_list[i].news_excerpt = $sce.trustAsHtml(response.data.news_list[i].news_excerpt);
                    }
                    show_news(response.data);
                })
        };

        this.getNews = function (call_back, _news_id) {
            networkService.handleRepData('get', $rootScope.newsUrl + _news_id, null, null, null)
                .then(function (response) {
                    if (response.data.news) {
                        response.data.news.news_excerpt = $sce.trustAsHtml(response.data.news.news_excerpt);
                        response.data.news.news_content = $sce.trustAsHtml(response.data.news.news_content);
                    }
                    call_back(response.data);
                })
        }

    });

angular
    .module('ustc-oj')
    .service('profileService', function ($rootScope, userService, networkService, siteService) {

        this.verifyEmail = function (after_sending) {
            networkService.handleRepData('get', $rootScope.verifyEmailUrl, null, null, null)
                .then(function (response) {
                    siteService.showAlert("An verification email has been sent. Please check your spam box.");
                    after_sending(response);
                })
        };

        this.verifyCode = function (show_verifyResult, _token) {
            data = {
                "token": _token
            };
            networkService.handleRepData('post', $rootScope.verifyEmailUrl, data, null, null)
                .then(function (result) {
                    show_verifyResult(result);
                })
        };

        this.getUserProfile = function (showUserProfile, _username) {
            networkService.handleRepData('get', $rootScope.profileUrl + _username, null, null, null)
                .then(function (response) {
                    showUserProfile(response);
                });
        };

        this.getRegisteredList = function (showRegisteredContest, _username, no_warning) {
            if (userService.isLoggedIn()) {
                networkService.handleRepData('get', $rootScope.registeredContestListUrl, null, null, null, no_warning)
                    .then(function (response) {
                        showRegisteredContest(response.data);
                    });
            }
        };

        this.bindId = function (callback, _ticket, _service_url) {
            data = {
                "ticket": _ticket,
                "service": _service_url
            };
            if (userService.isLoggedIn()) {
                networkService.handleRepData('post', $rootScope.bindIdUrl, data, null, null)
                    .then(function (response) {
                        callback(response.data);
                    });
            }
        };

    });

angular
    .module('ustc-oj')
    .service('userService', function ($rootScope, $cookies, $http, $window, siteService) {

        this.login = function (showLoginResult, username, password) {

            var data = {
                password: MD5(password),
                username: username
            };
            //console.log(data);

            response = $http.post($rootScope.apiHost + $rootScope.loginUrl, $.param(data), $rootScope.tempConfig)
                .then(function (response) {
                    if (siteService.checkResponse(response)) {
                        cookieSaving("userId", response.data.data.user.user_id);
                        cookieSaving("token", response.data.data.token);
                        cookieSaving("username", response.data.data.user.username);
                        showLoginResult(true);
                        if ($rootScope.autoAdjustTime) siteService.adjustTime();
                    }
                });

        };

        this.register = function (showRegisterResult, _username, _password, _email) {

            var data = {
                password: MD5(_password),
                username: _username,
                email: _email
            };

            //response = networkService.post($rootScope.registerUrl, data);
            response = $http.post($rootScope.apiHost + $rootScope.registerUrl, $.param(data), $rootScope.tempConfig)
                .then(function (response) {
                    if (siteService.checkResponse(response)) {
                        showRegisterResult(response);
                    }

                });
        };

        this.setFilter = function (_filter) {
            cookieSaving("filter", JSON.stringify(_filter));
        };

        this.getFilter = function () {
            var ret = $cookies.get("filter");
            if (!ret) {
                ret = {
                    user: null,
                    problem: null,
                    result: null
                }
            }
            else {
                ret = JSON.parse(ret);
            }
            return ret;
        };

        this.getToken = function () {
            return $cookies.get("token");
        };

        this.getUserid = function () {
            var tmpId = $cookies.get("userId");
            if (tmpId) {
                return tmpId;
            }
            else {
                return null;
            }
        };

        this.getUsername = function () {
            var tmpName = $cookies.get("username");
            if (tmpName) {
                return tmpName;
            }
            else {
                return null;
            }
        };

        this.isLoggedIn = function () {
            return $cookies.get("userId") != null;
        };

        this.getUserAvatar = function () {
            return $rootScope.avatarUrl + "user_head.png";
        };

        this.saveLastLang = function (_lang) {
            cookieSaving("lastLang", _lang);
        };

        this.getLastLang = function () {
            if ($cookies.get("lastLang")) {
                return $cookies.get("lastLang");
            }
            else {
                return 1;
            }
        };

        this.saveLastProb = function (_lang) {
            cookieSaving("lastProb", _lang);
        };

        this.getLastProb = function () {
            if ($cookies.get("lastProb")) {
                return $cookies.get("lastProb");
            }
            else {
                return null;
            }
        };

        cookieSaving = function (key, value, expireDays) {
            expireDays = expireDays || 365;
            var now = new Date();
            now.setDate(now.getDate() + expireDays);
            $cookies.put(key, value, {"expires": now});
        };

        this.logOut = function () {
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });
        };


    });

angular
    .module('ustc-oj')
    .service('sourcetagService', function ($rootScope, $sce, userService, networkService, siteService) {

        this.getTaskList = function (_callback, _page, _per_page) {

            param = {
                page: _page,
                per_page: _per_page
            };

            networkService.handleRepData('get', $rootScope.sourcetagTaskUrl, null, {params: param}, null)
                .then(function (response) {
                    _callback(response.data);
                });

        };

        this.getSourceList = function(_callback, task_id) {
            networkService.handleRepData('get', $rootScope.sourcetagTaskUrl + task_id + '/', null, null, null)
                .then(function (response) {
                    _callback(response.data);
                });

        };

        this.getSource = function(_callback, task_id, source_id) {
            networkService.handleRepData('get', $rootScope.sourcetagTaskUrl + task_id + '/' + source_id + '/', null, null, null)
                .then(function (response) {
                    _callback(response.data);
                });
        }

        this.submitTag = function(_callback, task_id, source_id, opt0, opt1, opt2, opt3, opt4) {
            var data = {
                'opt0': opt0,
                'opt1': opt1,
                'opt2': opt2,
                'opt3': opt3,
                'opt4': opt4
            };
            networkService.handleRepData('post', $rootScope.sourcetagTaskUrl + task_id + '/' + source_id + '/', data, null, null)
                .then(function (response) {
                    _callback(response.data);
                });
        }
    });

var MD5 = function (s) {
    function L(k, d) {
        return (k << d) | (k >>> (32 - d))
    }

    function K(G, k) {
        var I, d, F, H, x;
        F = (G & 2147483648);
        H = (k & 2147483648);
        I = (G & 1073741824);
        d = (k & 1073741824);
        x = (G & 1073741823) + (k & 1073741823);
        if (I & d) {
            return (x ^ 2147483648 ^ F ^ H)
        }
        if (I | d) {
            if (x & 1073741824) {
                return (x ^ 3221225472 ^ F ^ H)
            } else {
                return (x ^ 1073741824 ^ F ^ H)
            }
        } else {
            return (x ^ F ^ H)
        }
    }

    function r(d, F, k) {
        return (d & F) | ((~d) & k)
    }

    function q(d, F, k) {
        return (d & k) | (F & (~k))
    }

    function p(d, F, k) {
        return (d ^ F ^ k)
    }

    function n(d, F, k) {
        return (F ^ (d | (~k)))
    }

    function u(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(r(F, aa, Z), k), I));
        return K(L(G, H), F)
    }

    function f(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(q(F, aa, Z), k), I));
        return K(L(G, H), F)
    }

    function D(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(p(F, aa, Z), k), I));
        return K(L(G, H), F)
    }

    function t(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(n(F, aa, Z), k), I));
        return K(L(G, H), F)
    }

    function e(G) {
        var Z;
        var F = G.length;
        var x = F + 8;
        var k = (x - (x % 64)) / 64;
        var I = (k + 1) * 16;
        var aa = Array(I - 1);
        var d = 0;
        var H = 0;
        while (H < F) {
            Z = (H - (H % 4)) / 4;
            d = (H % 4) * 8;
            aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
            H++
        }
        Z = (H - (H % 4)) / 4;
        d = (H % 4) * 8;
        aa[Z] = aa[Z] | (128 << d);
        aa[I - 2] = F << 3;
        aa[I - 1] = F >>> 29;
        return aa
    }

    function B(x) {
        var k = "", F = "", G, d;
        for (d = 0; d <= 3; d++) {
            G = (x >>> (d * 8)) & 255;
            F = "0" + G.toString(16);
            k = k + F.substr(F.length - 2, 2)
        }
        return k
    }

    function J(k) {
        k = k.replace(/rn/g, "n");
        var d = "";
        for (var F = 0; F < k.length; F++) {
            var x = k.charCodeAt(F);
            if (x < 128) {
                d += String.fromCharCode(x)
            } else {
                if ((x > 127) && (x < 2048)) {
                    d += String.fromCharCode((x >> 6) | 192);
                    d += String.fromCharCode((x & 63) | 128)
                } else {
                    d += String.fromCharCode((x >> 12) | 224);
                    d += String.fromCharCode(((x >> 6) & 63) | 128);
                    d += String.fromCharCode((x & 63) | 128)
                }
            }
        }
        return d
    }

    var C = Array();
    var P, h, E, v, g, Y, X, W, V;
    var S = 7, Q = 12, N = 17, M = 22;
    var A = 5, z = 9, y = 14, w = 20;
    var o = 4, m = 11, l = 16, j = 23;
    var U = 6, T = 10, R = 15, O = 21;
    s = J(s);
    C = e(s);
    Y = 1732584193;
    X = 4023233417;
    W = 2562383102;
    V = 271733878;
    for (P = 0; P < C.length; P += 16) {
        h = Y;
        E = X;
        v = W;
        g = V;
        Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
        V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
        W = u(W, V, Y, X, C[P + 2], N, 606105819);
        X = u(X, W, V, Y, C[P + 3], M, 3250441966);
        Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
        V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
        W = u(W, V, Y, X, C[P + 6], N, 2821735955);
        X = u(X, W, V, Y, C[P + 7], M, 4249261313);
        Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
        V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
        W = u(W, V, Y, X, C[P + 10], N, 4294925233);
        X = u(X, W, V, Y, C[P + 11], M, 2304563134);
        Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
        V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
        W = u(W, V, Y, X, C[P + 14], N, 2792965006);
        X = u(X, W, V, Y, C[P + 15], M, 1236535329);
        Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
        V = f(V, Y, X, W, C[P + 6], z, 3225465664);
        W = f(W, V, Y, X, C[P + 11], y, 643717713);
        X = f(X, W, V, Y, C[P + 0], w, 3921069994);
        Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
        V = f(V, Y, X, W, C[P + 10], z, 38016083);
        W = f(W, V, Y, X, C[P + 15], y, 3634488961);
        X = f(X, W, V, Y, C[P + 4], w, 3889429448);
        Y = f(Y, X, W, V, C[P + 9], A, 568446438);
        V = f(V, Y, X, W, C[P + 14], z, 3275163606);
        W = f(W, V, Y, X, C[P + 3], y, 4107603335);
        X = f(X, W, V, Y, C[P + 8], w, 1163531501);
        Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
        V = f(V, Y, X, W, C[P + 2], z, 4243563512);
        W = f(W, V, Y, X, C[P + 7], y, 1735328473);
        X = f(X, W, V, Y, C[P + 12], w, 2368359562);
        Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
        V = D(V, Y, X, W, C[P + 8], m, 2272392833);
        W = D(W, V, Y, X, C[P + 11], l, 1839030562);
        X = D(X, W, V, Y, C[P + 14], j, 4259657740);
        Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
        V = D(V, Y, X, W, C[P + 4], m, 1272893353);
        W = D(W, V, Y, X, C[P + 7], l, 4139469664);
        X = D(X, W, V, Y, C[P + 10], j, 3200236656);
        Y = D(Y, X, W, V, C[P + 13], o, 681279174);
        V = D(V, Y, X, W, C[P + 0], m, 3936430074);
        W = D(W, V, Y, X, C[P + 3], l, 3572445317);
        X = D(X, W, V, Y, C[P + 6], j, 76029189);
        Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
        V = D(V, Y, X, W, C[P + 12], m, 3873151461);
        W = D(W, V, Y, X, C[P + 15], l, 530742520);
        X = D(X, W, V, Y, C[P + 2], j, 3299628645);
        Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
        V = t(V, Y, X, W, C[P + 7], T, 1126891415);
        W = t(W, V, Y, X, C[P + 14], R, 2878612391);
        X = t(X, W, V, Y, C[P + 5], O, 4237533241);
        Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
        V = t(V, Y, X, W, C[P + 3], T, 2399980690);
        W = t(W, V, Y, X, C[P + 10], R, 4293915773);
        X = t(X, W, V, Y, C[P + 1], O, 2240044497);
        Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
        V = t(V, Y, X, W, C[P + 15], T, 4264355552);
        W = t(W, V, Y, X, C[P + 6], R, 2734768916);
        X = t(X, W, V, Y, C[P + 13], O, 1309151649);
        Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
        V = t(V, Y, X, W, C[P + 11], T, 3174756917);
        W = t(W, V, Y, X, C[P + 2], R, 718787259);
        X = t(X, W, V, Y, C[P + 9], O, 3951481745);
        Y = K(Y, h);
        X = K(X, E);
        W = K(W, v);
        V = K(V, g)
    }
    var i = B(Y) + B(X) + B(W) + B(V);
    return i.toLowerCase()
};

