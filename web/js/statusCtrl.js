/**
 * Created by zhaohongzhu on 12/8/16.
 */
app.controller("statusCtrl", function($scope, $http, $rootScope, $window, problemService){


    problemService.getStatusList(function(response) {
        console.log(response);
        $scope.statusList = response;
    }, 1, 20);

    $scope.getResult = function(_resultid) {
        //console.log(_resultid);
        for (var i in problemService.resultList) {
            if (problemService.resultList[i] == _resultid) {
                return i;
            }
        }
        return "Unexpected Error";
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