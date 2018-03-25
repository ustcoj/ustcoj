angular
    .module('ustc-oj')
    .controller("sourcetagListCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService, userService, sourcetagService){

        console.log("sourcetagListCtrl loaded");

        $scope.refreshPage = function () {
            sourcetagService.getTaskList(function (data) {
                $scope.taskList = data;
                console.log(data);
                $scope.finishLoading = true;
            }, 10, 10);
        };

        $scope.refreshPage();

        $scope.showTask = function(taskId){
            $window.location.href = siteService.sourcetagTaskLink + taskId + '/';
        };
    });