app.controller("submitCtrl", function ($scope, $http, $rootScope) {
    $scope.submitSource = "ttt";
    $scope.submitID = 1;
    $scope.submitLang = "C++11"
    $scope.submitFire = function (source, lang, id) {
        var data = $.param({
            code: source,
            compiler: lang,
            problem_id: id
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post($rootScope.apiHost + "/api/submission",data, config);
    }
})

