/**
 * Created by zhaohongzhu on 12/8/16.
 */
app.controller("statusCtrl", function($scope, $http, $rootScope, $window){

    $http.get($rootScope.apiHost + "/api/submission", {params: {
        page: 1,
        per_page: 50
    }})
        .then(function(response) {
            //alert(response.status);
            $scope.statusList = response.data;
        });
    /*
    $scope.show_prob = function(prob_id){
        /*
         $rootScope.$broadcast('problemNumberChanged', $prob_id);
         $rootScope.tabShow = "showProblem";

        $window.location.href = '#/problems/' + prob_id;
    }
    */
});