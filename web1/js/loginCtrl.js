angular
    .module('ustc-oj')
    .controller("loginCtrl", function ($scope, $http, $rootScope, $window, userService, siteService) {

        $scope.signUpMode = false;

        $scope.registerFire = function (username, pass, passagain, email) {

            if (pass == passagain) {

                userService.register(function(result) {
                    if (result) {
                        $scope.loginFire(username, pass, true);
                    }
                }, username, pass, email);

            }
            else {

            }

        };
        $scope.loginFire = function (username, pass,fromRegister=false) {

            userService.login(function(result) {
                if (result) {
                    if (fromRegister) $window.location.href = siteService.profileLink;
                    else $window.location.href = siteService.problemLink;
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
