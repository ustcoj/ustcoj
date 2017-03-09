angular
    .module('ustc-oj')
    .controller("loginCtrl", function ($scope, $http, $rootScope, $window, userService, siteService) {

        $scope.signUpMode = false;

        $scope.registerFire = function (username, pass, passagain, email) {

            if (pass == passagain) {

                userService.register(function(result) {
                    if (result) {
                        $window.location.href = siteService.profileLink;
                    }
                }, username, pass, email);
            }
            else {

            }

        };
        $scope.loginFire = function (username, pass) {

            userService.login(function(result) {
                if (result) {
                    $window.location.href = siteService.profileLink;
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
