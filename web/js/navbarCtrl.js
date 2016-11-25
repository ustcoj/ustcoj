app.controller("navbarCtrl", function($scope, $rootScope){

    $scope.changeTab = function(toTab) {
        $rootScope.tabShow = toTab;
    };

});