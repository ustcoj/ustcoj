/**
 * Created by zhaohongzhu on 2/24/17.
 */
angular
    .module('ustc-oj')
    .controller("showSubmissionCtrl", function($scope, $http, $rootScope, $routeParams, $window, problemService){

        $scope.finishLoading = false;
        $scope.titleChanged = false;
        $scope.onChangeTitleAction = false;
        $scope.titleObj = $(".fixed-navbar-title")[0];
        $scope.descObj = $(".submisson-inf")[0];
        $scope.isContest = false;
        $scope.languageList = problemService.languageList;
        if ($routeParams.contest_ID) {
            $scope.isContest = true;
        }


        if ($routeParams.submission_ID != null) {

            $scope.submissionId = $routeParams.submission_ID;

            problemService.getSubmissonInfo(function (response) {
                $scope.submissionResult = problemService.resultList[response.result];

                if (response.info["err"] == null) {
                    $scope.submissionCaseDetail = response.info.data;
                    
                }
                else {
                    $scope.submissionErrorMsg = response.info.data;
                }
                $scope.submissionCode = response.code;
                $scope.submissionProbId = response.problem_id;
                $scope.submissionTitle = response.problem.problem_title;
                $scope.submissionLang = response.language;
                $scope.submissionTime = response.push_time;
                $scope.submissionUser = response.user.username;
                $scope.submissionLength = response.code.length;
                if ($scope.isContest) {
                    $scope.submissionContestId = response.contest_id;
                    $scope.submissionSortIdx = response.problem.sort_index;
                }
                var codetext = $('<div>').text($scope.submissionCode).html();
                $("#code-area").html(codetext);
                Prism.highlightAll();
                $scope.finishLoading = true;
            }, $scope.submissionId)

        }

        $scope.getResult = function(_resultid) {
            if (problemService.resultList[_resultid] == undefined)
                return "Unexpected Error";
            else return problemService.resultList[_resultid];
        };

        $scope.showProblem = function () {
            if ($scope.isContest) {
                $window.location.href = String.Format(siteService.contestProblemLink, $scope.submissionContestId, $scope.submissionSortIdx);
            }
            else {
                $window.location.href = '#/problems/' + $scope.submissionProbId;
            }
        }
    });