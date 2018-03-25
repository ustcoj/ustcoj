angular
    .module('ustc-oj')
    .controller("sourcetagSourceCtrl", function($scope, $http, $rootScope, $window, $routeParams, problemService, siteService, userService, sourcetagService){

        console.log("sourcetagSourceCtrl loaded");

        var taskId = $routeParams.task_id;
        var sourceId = $routeParams.source_id;

        $scope.refreshPage = function () {
            sourcetagService.getSource(function (data) {
                $scope.source = data;
                console.log(data);

                var codetext = $('<div>').text($scope.source.source).html();
                $("#code-area").html(codetext);
                Prism.highlightAll();

                $scope.finishLoading = true;
            }, taskId, sourceId);
        };

        $scope.submitTag = function () {
            var selected_opt = $scope.source.selected_opt;
            sourcetagService.submitTag(function (data) {
                    $window.location.href = '#/sourcetag/' + taskId + '/';
                },
                taskId, sourceId,
                selected_opt[0], selected_opt[1], selected_opt[2], selected_opt[3], selected_opt[4]
            );
        };

        $scope.refreshPage();
    });