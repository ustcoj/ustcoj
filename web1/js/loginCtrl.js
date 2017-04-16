angular
    .module('ustc-oj')
    .controller("loginCtrl", function ($scope, $http, $rootScope, $window, userService, siteService, profileService) {

        if (userService.isLoggedIn()) {
            $window.location.href = siteService.homeLink;
        }

        $scope.signUpMode = false;

        $scope.registerFire = function (username, pass, passagain, email) {

            if () {

            }

            if (pass == passagain) {

                userService.register(function(result) {
                    if (result) {
                        $scope.loginFire(username, pass, true);
                    }
                }, username, pass, email);

            }
            else {
                siteService.showAlert("Inconsistent passwords")
            }

        };
        $scope.loginFire = function (username, pass,fromRegister) {

            fromRegister = fromRegister || false;

            userService.login(function(result) {
                if (result) {
                    if (fromRegister) {
                        profileService.verifyEmail(function (response) {

                        });
                        $window.location.href = siteService.profileLink;
                    }
                    else $window.location.href = siteService.homeLink;
                }
            }, username, pass);

        };


        $scope.toLogin = function () {
            $scope.signUpMode = false;
        };

        $scope.toSignUp = function () {
            $scope.signUpMode = true;
        };


});
