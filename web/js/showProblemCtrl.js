app.controller("showProblemCtrl", function($scope, $http, $rootScope, $sce, $routeParams){

    /*
    $scope.update = function(){
    	$http.get($rootScope.apiHost + "/api/problem/" + $rootScope.probNumber)
        .then(function(response) {
            //alert(response.status);
            $scope.problemData = response.data;
            $scope.problemData.data.problem.description = $sce.trustAsHtml($scope.problemData.data.problem.description);
        });
    };

    $scope.update();

    $rootScope.$on('problemNumberChanged', function(event, data){
    	$rootScope.probNumber = data;
        $scope.update();
    });
    */
    $scope.finishLoading = false;
    $scope.titleChanged = false;
    $scope.titleObj = document.getElementsByClassName('fixed-navbar-title')[0];
    $scope.descObj = document.getElementsByClassName('prob-desc')[0];

    $http.get($rootScope.apiHost + "/api/problem/" + $routeParams.problem_ID)
        .then(function(response) {
            //alert(response.status);
            $scope.finishLoading = true;
            $scope.problemData = response.data;
            $scope.problemData.data.problem.description =
                $sce.trustAsHtml($scope.problemData.data.problem.description);
            $scope.problemData.data.problem.input =
                $sce.trustAsHtml($scope.problemData.data.problem.input_description);
            $scope.problemData.data.problem.output =
                $sce.trustAsHtml($scope.problemData.data.problem.output_description);
            $scope.problemData.data.problem.hint =
                $sce.trustAsHtml($scope.problemData.data.problem.hint);
        });

    window.onscroll = function (e){
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

    function ChangeTitle()
    {
        $scope.titleChanged = true;
        $scope.titleObj.innerHTML = $scope.problemData.data.problem.problem_title;
    }

    function RecoverTitle()
    {
        if ($scope.titleChanged){
            $scope.titleChanged = false;
            $scope.titleObj.innerHTML = '<img src="USTCOJ.svg" height="42px" alt="USTC ONLINE JUDGE" style="margin-top: 5px">';
        }
    }
});