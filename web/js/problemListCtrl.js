angular
    .module('ustc-oj')
    .controller("problemListCtrl", function($scope, $http, $rootScope, $window, profileService, problemService, userService, siteService){

        $scope.myTrying = {};
        $scope.mySolved = {};
        $scope.perpage = 30;
        $scope.pageNow = 1;
        $scope.catchEnter = function(_event) {
            if (_event.which === 13) {
                $scope.refreshPage();
            }
        };
        $scope.pageOffset = function (_offset) {
            if ($scope.pageNow) {
                if (_offset + $scope.pageNow >= 1 && _offset + $scope.pageNow <= $scope.pageSum) {
                    $scope.pageNow += _offset;
                }
                $scope.refreshPage();
            }
        };
        $scope.refreshPage = function () {
            problemService.getProblemList(function(data){
                $scope.problemList = data;
                $scope.problemOnPage = $scope.problemList.problem_list.length;
            }, $scope.pageNow, $scope.perpage);
        };

        problemService.getSiteInfo(function (response) {
            $scope.problemNum = 1000;
            $scope.pageSum = Math.ceil($scope.problemNum / $scope.perpage);
        });




        if (userService.isLoggedIn()) {
            profileService.getUserProfile(function (response) {
                response.data.solved_problem.forEach(function (item) {
                    $scope.mySolved[item] = true;
                });
                response.data.trying_problem.forEach(function (item) {
                    $scope.myTrying[item] = true;
                })
            }, userService.getUsername())
        }

        $scope.refreshPage();

        $scope.showProblem = function(problemId){
            $window.location.href = siteService.problemLink + problemId;
        }
    });
