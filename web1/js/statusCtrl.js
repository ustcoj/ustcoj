/**
 * Created by zhaohongzhu on 12/8/16.
 */
angular
    .module('ustc-oj')
    .controller("statusCtrl", function($routeParams, $scope, $http, $rootScope, $window, problemService, siteService){

        $scope.statusTrying = {};
        $scope.statusSolved = {};
        $scope.perpage = 25;
        $scope.pageNow = 1;
        $scope.isContest = false;
        $scope.contestId = null;

        if ($routeParams.contest_ID) {
            $scope.isContest = true;
            $scope.perpage = 25;
            $scope.pageNow = 1;
            $scope.contestId = $routeParams.contest_ID;
        }
        else {
            problemService.getSiteInfo(function (response) {
                $scope.submissionNum = response.submission_number;
                $scope.pageSum = Math.ceil($scope.submissionNum / $scope.perpage);
            });
        }

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
            if (!$scope.isContest) {
                problemService.getStatusList(function(response) {

                    $scope.statusList = response;
                    $scope.statusList.data.submission_list.forEach(function (item) {
                        var result = $scope.getResult(item.result);
                        if (result == "Accepted") {
                            $scope.statusSolved[item.submission_id] = true;
                        }
                        else if ($scope.checkWA(result)) {
                            $scope.statusTrying[item.submission_id] = true;
                        }
                    });
                    $scope.finishLoading = true;
                }, $scope.pageNow, $scope.perpage);
            }
            else {
                problemService.getMyContestStatus(function(response) {

                    $scope.statusList = response;
                    $scope.statusList.data.submission_list.forEach(function (item) {
                        var result = $scope.getResult(item.result);
                        if (result == "Accepted") {
                            $scope.statusSolved[item.submission_id] = true;
                        }
                        else if ($scope.checkWA(result)) {
                            $scope.statusTrying[item.submission_id] = true;
                        }
                    });
                    $scope.finishLoading = true;
                }, $scope.contestId, $scope.pageNow, $scope.perpage);
            }

        };

        $scope.checkWA = function (result) {
            return (result != "Compile Error" && result != "System Error" && result != "Pending" && result != "Judge Failed")
        };




        $scope.refreshPage();

        $scope.getResult = function(_resultid) {
            if (problemService.resultList[_resultid] == undefined)
                return "Unexpected Error";
            else return problemService.resultList[_resultid];
        };
        $scope.getLanguage = function(_languageid) {
            //console.log(_languageid);
            return problemService.languageList[_languageid];
        };

        $scope.getMaxTime = function(_data) {


            if (_data.info == undefined || _data.info.data == undefined) {
                return "-";
            }
            if (!Array.isArray(_data.info.data)) {
                return "-";
            }
            var ret = 0;
            for (var t in _data.info.data) {
                if (_data.info.data[t].cpu_time > ret)
                    ret = _data.info.data[t].cpu_time;
            }
            return ret + " ms";
        };

        $scope.getMaxMem = function(_data) {
            if (_data.info == undefined || _data.info.data == undefined) {
                return "-";
            }
            if (!Array.isArray(_data.info.data)) {
                return "-";
            }
            var ret = 0;
            for (var t in _data.info.data) {
                if (_data.info.data[t].memory > ret)
                    ret = _data.info.data[t].memory;
            }

            return ret;
        };

        $scope.showSubmission = function (_submission_id) {
            if ($scope.isContest) {
                $window.location.href = String.Format(siteService.contestSubmissionLink, $scope.contestId, _submission_id);
            }
            else {
                $window.location.href = '#/status/' + _submission_id;
            }
        }

        $scope.showProblem = function (_problem) {
            if ($scope.isContest) {
                $window.location.href = String.Format(siteService.contestProblemLink, $scope.contestId, _problem.sort_index);
            }
            else {
                $window.location.href = '#/problems/' + _problem.problem_id;
            }
        }
});