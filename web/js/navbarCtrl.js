angular
    .module('ustc-oj')
    .controller("navbarCtrl", function($scope, $rootScope, $window, $log, problemService){

    defaultSearchContent = "ID/Search";
    $scope.searchContent = "";

    $scope.searchFire = function(content) {
        if (problemService.checkValidProblemId(content)) {
            $window.location.href = '#/problems/' + content;
        }
    };

    $scope.jumpToProfile = function() {
        $window.location.href = '#/profile'
    };

});