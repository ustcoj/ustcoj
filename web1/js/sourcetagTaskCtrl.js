angular
    .module('ustc-oj')
    .controller("sourcetagTaskCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService, userService, sourcetagService){

        console.log("sourcetagTaskCtrl loaded");

        var taskId = $routeParams.task_id;

        $scope.refreshPage = function () {
            sourcetagService.getSourceList(function (data) {
                $scope.sourceList = data;
                console.log(data);
                $scope.finishLoading = true;
            }, taskId);
        };

        $scope.refreshPage();

        $scope.showSource = function(sourceId){
            $window.location.href = siteService.sourcetagTaskLink + taskId + '/' + sourceId +  '/';
        };
    });