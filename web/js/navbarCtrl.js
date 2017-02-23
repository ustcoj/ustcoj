app.controller("navbarCtrl", function($scope, $rootScope, $window, $log){

    defaultSearchContent = "ID/Search";
    $scope.searchContent = "";

    $scope.searchFire = function(content) {
        if (Number(content).toString() == content && Number(content) >= 1000 && Number(content) <= 1500) {
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