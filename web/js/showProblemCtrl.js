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
    $scope.onChangeTitleAction = false;
    $scope.titleObj = $(".fixed-navbar-title")[0];
    $scope.descObj = $(".prob-desc")[0];

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
    }

    function ChangeTitle()
    {
        if (!$scope.titleChanged){
            $scope.onChangeTitleAction = true;
            $scope.titleChanged = true;
            $($scope.titleObj).fadeOut("fast", function(){$(this).html($scope.problemData.data.problem.problem_title).fadeIn();});
            $scope.onChangeTitleAction = false;
        }
    }

    function RecoverTitle()
    {
        if ($scope.titleChanged){
            $scope.onChangeTitleAction = true;
            $scope.titleChanged = false;
            $($scope.titleObj).fadeOut("fast", function(){$(this).html('<img src="USTCOJ.svg" height="42px" alt="USTC ONLINE JUDGE" style="margin-top: 5px">').fadeIn();});
            $scope.onChangeTitleAction = false;
        }
    }
});