/**
 * Created by zhaohongzhu on 1/27/17.
 */
app.controller("editCtrl", function ($routeParams, $scope, $http, $rootScope, $window, networkService, problemService) {

    $scope.problemId = null;
    $scope.contestId = null;
    $scope.isContest = false;
    $scope.problemData = null;
    $scope.problemEdit = null;
    $scope.finishLoading = false;

    console.log($routeParams);

    if ($routeParams.problem_ID == null) {

    }
    else {
        $scope.problemId = $routeParams.problem_ID;
        problemService.getProblemData(function(data){
            $scope.problemData = data;
            $scope.problemEdit = data.problem;
            $scope.finishLoading = true;
        }, $scope.problemId);
    }

});

var editormdTitle, editormdInputDescription, editormdOutputDescription, editormdHint;

$(function() {
    var editor = editormd("editormd", {
        path : "./lib/" // Autoload modules mode, codemirror, marked... dependents libs path
    });

    /*
     // or
     var editor = editormd({
     id   : "editormd",
     path : "../lib/"
     });
     */
});
