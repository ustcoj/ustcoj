app.controller("loginCtrl", function ($scope, $http, $rootScope) {
    $scope.registerFire = function (username, pass, passagain) {
        $http.post($rootScope.apiHost + "/api/register", {params: {
            code: source,
            compiler: lang,
            problem_id: id
        }});
    };
    $scope.loginFire = function (username, pass, passagain) {
        $http.post($rootScope.apiHost + "/api/register", {params: {
            code: source,
            compiler: lang,
            problem_id: id
        }});
    };
    $scope.signUpMode = false;

    $scope.toLogin = function () {
        $scope.signUpMode = false;
    }

    $scope.toSignUp = function () {
        $scope.signUpMode = true;
    }
});
