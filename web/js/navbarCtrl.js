app.controller("navbarCtrl", function($scope, $rootScope, $window, $log, problemService){

    defaultSearchContent = "ID/Search";
    $scope.searchContent = "";

    $scope.searchFire = function(content) {
        if (problemService.checkValidProblemId(content)) {
            /*
            $rootScope.$broadcast('problemNumberChanged', Number(content));
            $scope.changeTab("showProblem");
            */
            $window.location.href = '#/problems/' + content;
        }
        /*$log.log("!!!!");*/
    };

    $scope.jumpToProfile = function() {
        $window.location.href = '#/profile'
    };

});