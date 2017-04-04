angular
    .module('ustc-oj')
    .controller("submitCtrl", function ($routeParams, $scope, $http, $rootScope, $window, problemService, userService) {
    $scope.submitSource = "";
    $scope.isIdValid = false;
    $scope.submitLang = userService.getLastLang();
    $scope.submitId = userService.getLastProb();
    $scope.submitStatus = false;
    $scope.submitMsg = "";
    $scope.submitPublic = 0;
    $scope.isContest = false;
    $scope.contestId = 0;
    $scope.contestInfo = null;
    $scope.nowContestProblem = null;
    $scope.languageList = problemService.languageList;
    $scope.submitTitle = " --- ";
    //console.log($scope.languageList);

    if ($routeParams.contest_ID == null) {

    }
    else {
        console.log($routeParams);
        $scope.isContest = true;
        $scope.contestId = $routeParams.contest_ID;
        $scope.nowContestProblem = $routeParams.prolem_SEQ;
        problemService.getContestInfo(function (response) {
            console.log(response.problem_list);
            $scope.contestInfo = response;
            $scope.contestProblem = response.problem_list;
            if ($routeParams.problem_SEQ == null) {
                $scope.nowContestProblem = $scope.contestProblem[0].sort_index;
            }
            else {
                $scope.nowContestProblem = $routeParams.problem_SEQ;
            }
        }, $scope.contestId);
    }

    $scope.submitFire = function () {

        var submissionData = {
            code: $scope.submitSource,
            language: $scope.submitLang
        };
        if ($scope.isContest) {
            submissionData["contest_id"] = $scope.contestId;
            submissionData["sort_index"] = $scope.nowContestProblem;
            userService.saveLastLang($scope.submitLang);
            problemService.submitCode(function(response) {
                $window.location.href = '#/contests/' + $scope.contestId;
            }, submissionData);
        }
        else {
            submissionData["problem_id"] = $scope.submitId;
            userService.saveLastLang($scope.submitLang);
            userService.saveLastProb($scope.submitId);

            problemService.submitCode(function(response) {
                $window.location.href = '#/status/';
            }, submissionData);
        }
        console.log(submissionData);

    };

    $scope.getProblemTitle = function() {
        $scope.isIdValid = false;
        $scope.submitTitle = " --- ";
        if (problemService.checkValidProblemId($scope.submitId)) {
            problemService.getSimpleProblem(function(result) {
                $scope.submitTitle = result.problem.problem_title;
            }, $scope.submitId)
        }
    };

    $scope.getProblemTitle();

});

