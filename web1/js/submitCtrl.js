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
    $scope.ContestId = 0;
    $scope.nowContestProblem = null;
    $scope.languageList = problemService.languageList;
    $scope.submitTitle = "????";
    //console.log($scope.languageList);

    if ($routeParams.contest_ID == null) {

    }
    else {
        $scope.isContest = true;
        $scope.ContestId = $routeParams.contest_ID;
        $scope.nowContestProblem = $routeParams.prolem_SEQ;
    }

    $scope.submitFire = function (__source, __lang) {

        var submissionData = {
            code: __source,
            language: __lang,
            problem_id: $scope.submitId
        };
        if ($scope.isContest) {
            submissionData["contest_id"] = $scope.ContestId;
        }
        console.log(submissionData);
        userService.saveLastLang(__lang);
        userService.saveLastProb($scope.submitId);

        problemService.submitCode(function(response) {
            $window.location.href = '#/status/';
        }, submissionData);
    };

    $scope.getProblemTitle = function() {
        $scope.isIdValid = false;
        $scope.submitTitle = "????";
        if (problemService.checkValidProblemId($scope.submitId)) {
            problemService.getSimpleProblem(function(result) {
                $scope.submitTitle = result.problem.problem_title;
            }, $scope.submitId)
        }
    };

});

