app.controller("submitCtrl", function ($routeParams, $scope, $http, $rootScope, $window, networkService) {
    $scope.submitSource = "ttt";
    $scope.submitID = 1;
    $scope.submitLang = "cpp";
    $scope.submitStatus = false;
    $scope.submitMsg = "";
    $scope.isContest = false;
    $scope.ContestId = 0;
    $scope.nowContestProblem = null;

    if ($routeParams.contest_ID == null) {

    }
    else {
        $scope.isContest = true;
        $scope.ContestId = $routeParams.contest_ID;
        $scope.nowContestProblem = $routeParams.prolem_SEQ;
    }

    $scope.submitFire = function (source, lang, id) {
        var data = $.param({
            code: source,
            compiler: lang,
            problem_id: id
        });

        $http.post($rootScope.apiHost + "/api/submission", data, config).then(function (response) {
            if (response.data.status.code === 1){
                $scope.submitStatus = true;
                $scope.submitMsg = response.data.status.message;
            } else {
                $window.location.href = '#/status/';
            }


        });

    }
});

