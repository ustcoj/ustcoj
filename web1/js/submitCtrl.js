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
        $scope.showCodeArea = false;
        $scope.fileWaiting = false;
        var reader = new FileReader();
        reader.onload = function () {
            $scope.fileWaiting = false;
            $scope.fileSelected = true;
            $scope.$apply();
        };
        // console.log($scope.submitLang);

        if ($routeParams.contest_ID == null) {
            $scope.submitId = $routeParams.problem_ID || $scope.submitId;
        }
        else {
            console.log($routeParams);
            $scope.isContest = true;
            $scope.contestId = $routeParams.contest_ID;
            $scope.nowContestProblem = $routeParams.prolem_SEQ;
            problemService.getContestInfo(function (response) {
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

            if ($scope.fileSelected && $scope.fileWaiting) {
                return;
            }

            var realSource = $scope.submitSource;
            console.log($scope.submitFile);
            if (!realSource && $scope.fileSelected && $scope.submitFile) {
                realSource = reader.result;
                $scope.fileWaiting = true;
                //console.log(reader.result);
            }

            var submissionData = {
                code: realSource,
                language: $scope.submitLang
            };
            if ($scope.isContest) {
                submissionData["contest_id"] = $scope.contestId;
                submissionData["sort_index"] = $scope.nowContestProblem;
                userService.saveLastLang($scope.submitLang);
                problemService.submitCode(function(response) {
                    $window.location.href = '#/contests/' + $scope.contestId + '/status/';
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

        $scope.clickOnFileArea = function () {
            if (!$scope.fileSelected) {
                $scope.showCodeArea = true;
            }
        };

        $scope.codeAreaBlur = function () {
            if ($scope.submitSource == "") {
                $scope.showCodeArea = false;
            }
        };

        $scope.$watch('submitSource', function (newCode, oldCode) {
            if (oldCode && !newCode) {
                $scope.showCodeArea = false;
            }
        });

        $scope.codeAreaDisplay = function (newCode, oldCode) {
            console.log(newCode);
            console.log(oldCode);

        };

        $scope.selectFile = function(){
            setTimeout(function() {
                $('#inputFile').click();
            }, 0);
        };
        
        $scope.clearFile = function () {
            $('#inputFile').val('');
            $scope.fileSelected = false;
        };

        $scope.fileChanged = function (element) {

            setTimeout(function () {
                $scope.$apply(function () {
                    if (element.files.length > 0) {
                        $scope.submitFile = element.files[0];
                        $scope.fileWaiting = true;
                        reader.readAsText($scope.submitFile);
                        $scope.submitFileName = element.files[0].name;
                        $scope.submitFileSize = element.files[0].size;
                    }
                    else {
                        $scope.fileSelected = false;
                        $scope.submitFile = null;
                    }
                });
            }, 0);

        }

});

