app.controller("problemListCtrl", function($scope, $http, $rootScope){

    $http.get($rootScope.apiHost + "/api/problem", {params: {
        page: 1,
        per_page: 5
    }})
        .then(function(response) {
            //alert(response.status);
            $scope.myWelcome = response.data;
        });

});