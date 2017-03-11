angular
    .module('ustc-oj')
    .controller("showProblemCtrl", function($scope, $http, $rootScope, $routeParams, problemService){

    $scope.finishLoading = false;
    $scope.titleChanged = false;
    $scope.onChangeTitleAction = false;
    $scope.titleObj = $(".fixed-navbar-title")[0];
    $scope.descObj = $(".prob-title-inf")[0];
    $scope.isContest = false;

    if ($routeParams.contest_ID == null) {
        if ($routeParams.problem_ID == null) {
            // TODO: show some error message

        }
        else {
            problemService.getProblemData(function(data){
                $scope.problemData = data;
                $scope.finishLoading = true;
                startRender($scope.problemData.problem);
            }, $routeParams.problem_ID);
        }
    }
    else {
        $scope.isContest = true;

        problemService.getContestInfo(function(data){
            $scope.contestInfo = data;
        }, $routeParams.contest_ID);

        if ($routeParams.problem_SEQ == null) {
            // TODO: show some error message
        }
        else {

        }
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
            $($scope.titleObj).fadeOut(50, function(){$(this).html($scope.problemData.problem.problem_title).fadeIn();});
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