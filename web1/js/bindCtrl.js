angular
    .module('ustc-oj')
    .controller("bindCtrl", function($scope, $http, $window, $rootScope, $location,
                                     problemService, userService, profileService, siteService){

    if (userService.isLoggedIn) {
        profileService.getUserProfile(function (response) {
            $scope.ustcid = response.data.ustc_id || null;
            if ($scope.ustcid) {
                siteService.showAlert("Seems that you have already bound an id");
                $window.location.href = siteService.profileLink;
            }
            else {
                $scope.finishLoadingUser = true;
            }
        }, userService.getUsername())
    }
    else {
        siteService.showAlert("Login required. Please try again");
        $window.location.href = "#/login/";
    }

    // console.log(siteService.bindDestination);
    
    $scope.confirmBind = function () {
        var ticket = $location.search()["ticket"];
        //console.log(ticket);
        if (ticket) {
            $scope.finishConfirm = true;
            profileService.bindId(function (response) {
                siteService.showAlert("Bound successful", "success");
                $window.location.href = siteService.profileLink;
            }, ticket, siteService.bindDestination);
        }
        else {
            siteService.showAlert("Failed to bind. Please try again");
            $window.location.href = siteService.profileLink;
        }
    }

});