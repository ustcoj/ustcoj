/**
 * Created by LY on 2016/5/11.
 */

var app = angular.module("ustc-oj", []);

app.run(function ($rootScope) {
    $rootScope.tabShow = "login";
    $rootScope.apiHost = "http://ustcoj.applinzi.com";
})

app.controller("indexCtrl", function($scope){

});

app.controller("navbarCtrl", function($scope, $rootScope){

    $scope.changeTab = function(toTab) {
        $rootScope.tabShow = toTab;
    };

});

app.controller("loginCtrl", function ($scope, $http, $rootScope) {
    $scope.registerFire = function (username, pass, passagain) {
        $http.post($rootScope.apiHost + "/api/register", {params: {
            code: source,
            compiler: lang,
            problem_id: id
        }});
    }
})

app.controller("problemListCtrl", function($scope, $http, $rootScope){

        $http.get($rootScope.apiHost + "/api/problem", {params: {
            page: 1,
            per_page: 5
        }})
            .then(function(response) {
                //alert(response.status);
                $scope.myWelcome = response.data;
            });

});

app.controller("oneProbCtrl", function($scope){

});

app.controller("submitCtrl", function ($scope, $http, $rootScope) {
    $scope.submitSource = "ttt";
    $scope.submitID = 1;
    $scope.submitLang = "C++11"
    $scope.submitFire = function (source, lang, id) {
        var data = $.param({
            code: source,
            compiler: lang,
            problem_id: id
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post($rootScope.apiHost + "/api/submission",data, config);
    }
})


/*
    taks1: angular作用域与数据传输问题

    task2: problemList展示，problem展示

    task3: submit提交设计
        task2.1: submit提交画图
        task2.2: submit提交展示

    task4: register && login
        task4.1: CSS实现
        task4.2: register && login JS

    task5: 背景图片选取
 */