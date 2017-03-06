/**
 * Created by zhaohongzhu on 2/24/17.
 */
angular
    .module('ustc-oj')
    .controller("showSubmissionCtrl", function($scope, $http, $rootScope, $routeParams, problemService){

        $scope.finishLoading = false;
        $scope.titleChanged = false;
        $scope.onChangeTitleAction = false;
        $scope.titleObj = $(".fixed-navbar-title")[0];
        $scope.descObj = $(".submisson-inf")[0];
        $scope.isContest = false;

        if ($routeParams.submission_ID != null) {

            $scope.submissionId = $routeParams.submission_ID;

            problemService.getSubmissonInfo(function (response) {
                $scope.submissionResult = problemService.resultList[response.result];
                $scope.submissionErrorMsg = response.info.data;
                $scope.submissionCode = "```\n" + response.code + "\n```\n";
                $scope.submissionTitle = response.problem.problem_title;

                startRender($scope.submissionCode);
                $scope.finishLoading = true;
            }, $scope.submissionId)

        }

        window.onscroll = function (e){
            if (!$scope.onChangeTitleAction){
                var prob_desc_div_top = $scope.descObj.getBoundingClientRect().top;
                if (prob_desc_div_top < 0){
                    ChangeTitle();
                }
                else{
                    if ($scope.titleChanged){
                        RecoverTitle();
                    }
                }
            }
        };

        function ChangeTitle()
        {
            if (!$scope.titleChanged){
                $scope.onChangeTitleAction = true;
                $scope.titleChanged = true;
                console.log($scope.problemData);
                $($scope.titleObj).fadeOut(50, function(){$(this).html("Submission " + $scope.submissionId).fadeIn();});
                $scope.onChangeTitleAction = false;
            }
        }

        function RecoverTitle()
        {
            if ($scope.titleChanged){
                $scope.onChangeTitleAction = true;
                $scope.titleChanged = false;
                $($scope.titleObj).fadeOut(50, function(){$(this).html('<img src="USTCOJ.svg" height="42px" alt="USTC ONLINE JUDGE" style="margin-top: 5px">').fadeIn();});
                $scope.onChangeTitleAction = false;
            }
        }
    });