app.controller("loginCtrl", function ($scope, $http, $rootScope) {
    $scope.registerFire = function (username, pass, passagain) {
        $http.post($rootScope.apiHost + "/api/register", {params: {
            code: source,
            compiler: lang,
            problem_id: id
        }});
    }
})