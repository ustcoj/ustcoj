angular
    .module('ustc-oj')
    .controller("showProblemCtrl", function($scope, $http, $window, $rootScope, $routeParams, problemService, siteService){

    $scope.finishLoading = false;
    $scope.titleChanged = false;
    $scope.onChangeTitleAction = false;
    $scope.titleObj = $(".fixed-navbar-title")[0];
    $scope.descObj = $(".prob-title-inf")[0];
    $scope.isContest = false;



    $scope.$watch(function(){
        MathJax.Hub.Config({
            showProcessingMessages: false, //关闭js加载过程信息
            messageStyle: "none", //不显示信息
            extensions: ["tex2jax.js"],
            jax: ["input/TeX", "output/HTML-CSS"],
            tex2jax: {
                inlineMath: [ ["\\(","\\)"] ], //行内公式选择符
                displayMath: [ ["\\[","\\]"] ], //段内公式选择符
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'], //避开某些标签
                ignoreClass:"comment-content" //避开含该Class的标签
            },
            "HTML-CSS": {
                availableFonts: ["STIX","TeX"], //可选字体
                showMathMenu: false //关闭右击菜单显示
            }
        });
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        return true;
    });

    $scope.goSubmit = function () {
        if ($scope.isContest) {
            $window.location.href = String.Format(siteService.contestSubmitLink, $routeParams.contest_ID) + $scope.problemData.problem.sort_index;
        }
        else {
            $window.location.href = siteService.submitLink + $scope.problemData.problem.problem_id;
        }
    };

    if ($routeParams.contest_ID == null) {
        if ($routeParams.problem_ID == null) {
            // TODO: show some error message

        }
        else {
            problemService.getProblemData(function(data){
                $scope.problemData = data;
                $scope.finishLoading = true;
                //startRender($scope.problemData.problem);
            }, $routeParams.problem_ID);
        }
    }
    else {
        $scope.isContest = true;
        problemService.getContestInfo(function (response) {

        }, $routeParams.contest_ID);

        if ($routeParams.problem_SEQ == null) {
            // TODO: show some error message
        }
        else {
            problemService.getProblemData(function(data){
                $scope.problemData = data;
                $scope.finishLoading = true;
            }, $routeParams.problem_SEQ, $routeParams.contest_ID);
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