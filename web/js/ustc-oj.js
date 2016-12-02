/**
 * Created by LY on 2016/5/11.
 */

var app = angular.module("ustc-oj", ['ngRoute']);

app.run(function ($rootScope) {
    $rootScope.tabShow = "showProblem";
    $rootScope.apiHost = "http://ustcoj.applinzi.com";
})











