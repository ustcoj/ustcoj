angular
    .module('ustc-oj')
    .controller("loginCtrl", function ($scope, $http, $rootScope, userService) {
    $scope.registerFire = function (username, pass, passagain) {

        if (pass == passagain) {

            userService.register(username, pass);
        }
        else {

        }

    };
    $scope.loginFire = function (username, pass) {

        userService.login(username, pass);

    };
    $scope.signUpMode = false;

    $scope.toLogin = function () {
        $scope.signUpMode = false;
    };

    $scope.toSignUp = function () {
        $scope.signUpMode = true;
    };



});
