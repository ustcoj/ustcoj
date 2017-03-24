angular
    .module('ustc-oj')
    .controller("navbarCtrl", function($routeParams, $scope, $rootScope, $location, $window, $log, problemService, siteService, userService){

        $scope.switchTheme = function () {
            $scope.isContest = $routeParams.contest_ID;
            $scope.contestId = $routeParams.contest_ID;
            if ($scope.isContest) problemService.getContestInfo(function (response) {
                $scope.contestInfo = response;
            }, $scope.contestId);
        };

        $scope.$on("$routeChangeSuccess", function (event) {
            $scope.switchTheme();
        });

        $('.search-text').keypress(function (e) {
            if (e.which == 13) {
                $('.search-btn').click();
                return false;    //<---- Add this line
            }
        });

        defaultSearchContent = "ID/Search";
        $scope.searchContent = "";
        $scope.siteService = siteService;

        $scope.searchFire = function(content) {
            if (problemService.checkValidProblemId(content)) {
                $window.location.href = siteService.problemLink + content;
            }
        };

        $scope.clickLogo = function () {
            $window.location.href = siteService.homeLink;
        };

        $scope.toBack = function () {
            siteService.goBack();
        };

        $scope.toProfile = function() {
            $window.location.href = siteService.profileLink;
        };

        $scope.toProblem = function() {
            $window.location.href = siteService.problemLink;
        };
        $scope.toContest = function() {
            $window.location.href = siteService.contestLink;
        };
        $scope.toStatus = function() {
            if ($scope.isContest) {
                $window.location.href = String.Format(siteService.contestStatusLink, $scope.contestId);
            }
            else
            $window.location.href = siteService.statusLink;
        };
        $scope.toSubmit = function() {
            if ($scope.isContest) {
                $window.location.href = String.Format(siteService.contestSubmitLink, $scope.contestId);
            }
            else
                $window.location.href = siteService.submitLink;
        };

        $scope.toBoard = function () {
            if ($scope.isContest) {
                $window.location.href = String.Format(siteService.contestBoardLink, $scope.contestId);
            }
            else
                $window.location.href = siteService.boardLink;
        };

        $scope.logOut = function () {
            userService.logOut();
            $window.location.href = '#/';
        }
});