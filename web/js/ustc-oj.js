/**
 * Created by LY on 2016/5/11.
 */

var app = angular.module("ustc-oj", []);

app.run(function ($rootScope) {
    $rootScope.tabShow = "showProblem";
    $rootScope.probNumber = 1050;
    $rootScope.apiHost = "http://ustcoj.applinzi.com";
})











