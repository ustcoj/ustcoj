/**
 * Created by vollt on 2017/4/6.
 */
angular
    .module('ustc-oj')
    .controller("editProblemCtrl", function ($routeParams, $scope, $http, $rootScope, $window,
                                      networkService, problemService, adminService) {
        $scope.problem_id = null;
        $scope.problem_title = null;
        $scope.time_limit = "1000";
        $scope.memory_limit = "268435456";
        $scope.input_method = "stdin";
        $scope.output_method = "stdout";
        $scope.author = null;
        $scope.source = null;
        $scope.description = null;
        $scope.input_description = null;
        $scope.output_description = null;
        $scope.input_sample = null;
        $scope.output_sample = null;
        $scope.hint = null;
        $scope.finishLoading = false;

        if ($routeParams.problem_ID == null) {

        }
        else {
            $scope.problem_id = $routeParams.problem_ID;
            adminService.getProblem(function(data){
                var problem = data.problem;
                for (var attrname in problem) { $scope[attrname] = problem[attrname]; }
            }, $scope.problem_id, null);
        }

        $scope.Fire = function () {
            var Data = {
                problem_title : $scope.problem_title,
                time_limit : $scope.time_limit,
                memory_limit : $scope.memory_limit,
                input_method : $scope.input_method,
                output_method : $scope.output_method,
                author : $scope.author,
                source : $scope.source,
                description : $scope.description,
                input_description : $scope.input_description,
                output_description : $scope.output_description,
                input_sample : $scope.input_sample,
                output_sample : $scope.output_sample,
                hint : $scope.hint
            };
            if ($scope.problem_id)
                newsData["news_id"] = $scope.problem_id

            adminService.addProblem(function(data){
                $window.location.href = '#/';
            }, Data);
        }

    });