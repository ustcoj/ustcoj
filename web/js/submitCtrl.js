app.controller("showSubmissionCtrl", function ($routeParams, $scope, $http, $rootScope, $window, problemService) {


    $scope.getProblemTitle = function() {
        $scope.isIdValid = false;
        $scope.submitTile = "????";
        if (problemService.checkValidProblemId(submitId)) {
            problemService.getProblemTitle(function(result) {
                if (result.isValid) {
                    $scope.submitTitle = result.title;
                }

            })
        }
    };
});

