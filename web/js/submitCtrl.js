app.controller("submitCtrl", function ($scope, $http, $rootScope, $window) {
    $scope.submitSource = "ttt";
    $scope.submitID = 1;
    $scope.submitLang = "cpp";
    $scope.submitStatus = false;
    $scope.submitMsg = "fsdf";
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
        $http.post($rootScope.apiHost + "/api/submission",data, config).then(function (response) {
            if (response.data.status.code === 1){
                $scope.submitStatus = true;
                $scope.submitMsg = response.data.status.message;
            } else {
                $window.location.href = '#/status/';
            }


        });

    }
})

