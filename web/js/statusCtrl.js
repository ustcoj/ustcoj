/**
 * Created by zhaohongzhu on 12/8/16.
 */
app.controller("statusCtrl", function($scope, $http, $rootScope, $window, problemService){

    $http.get($rootScope.apiHost + "/api/submission", {params: {
        page: 1,
        per_page: 50
    }})
        .then(function(response) {
            //alert(response.status);
            $scope.statusList = response.data;
        });

    $scope.getResult = function(_resultid) {
        //console.log(_resultid);
        return problemService.resultList[_resultid];
    };
    $scope.getLanguage = function(_languageid) {
        //console.log(_languageid);
        return problemService.languageList[_languageid];
    };

    /*
    $scope.show_prob = function(prob_id){
        /*
         $rootScope.$broadcast('problemNumberChanged', $prob_id);
         $rootScope.tabShow = "showProblem";

        $window.location.href = '#/problems/' + prob_id;
    }
    */
});