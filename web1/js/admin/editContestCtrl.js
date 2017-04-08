/**
 * Created by vollt on 2017/4/6.
 */
angular
    .module('ustc-oj')
    .controller("editContestCtrl", function ($routeParams, $scope, $http, $rootScope, $window,
                                      networkService, problemService, adminService) {
        $scope.contest_id = null;
        $scope.contest_title = null;
        $scope.author = null;
        $scope.description = null;
        $scope.finishLoading = false;

        if ($routeParams.contest_ID == null) {

        }
        else {
            $scope.contest_id = $routeParams.contest_ID;
            adminService.getContest(function(data){
                var contest = data;
                adminService.Populate(contest, $scope);
            }, $scope.contest_id);
        }

        $scope.Fire = function () {
            var Data = {
                contest_title : $scope.contest_title,
                contest_type : $scope.contest_type,
                author : $scope.author,
                description : $scope.description,
                start_time : $scope.start_time,
                end_time : $scope.end_time
            };

            if ($scope.contest_id)
                Data["contest_id"] = $scope.contest_id

            adminService.addContest(function(data){
                $window.location.href = '#/';
            }, Data);
        }

    });