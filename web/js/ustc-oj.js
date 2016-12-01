/**
 * Created by LY on 2016/5/11.
 */

var app = angular.module("ustc-oj", ['ngRoute']);

app.run(function ($rootScope) {
    $rootScope.tabShow = "showProblem";
    $rootScope.probNumber = 1002;
    $rootScope.apiHost = "http://ustcoj.applinzi.com";
})











