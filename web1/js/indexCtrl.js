angular
    .module('ustc-oj')
    .controller("indexCtrl", function($scope, $routeParams, $location, siteService){
        $scope.nowTheme = "norm";

        $scope.switchTheme = function () {
            console.log($routeParams);
            if ($routeParams["contest_ID"]) {
                $scope.nowTheme = "contest";
            }
            else {
                $scope.nowTheme = "norm";
            }
        };

        $scope.$on("$routeChangeSuccess", function (event) {
            $scope.switchTheme();
        });
        $scope.switchTheme();
});