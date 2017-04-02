/**
 * Created by zhaohongzhu on 3/4/17.
 */
angular
    .module('ustc-oj')
    .controller("profileCtrl", function($scope, $routeParams, $window, profileService, userService, siteService){

        var profileUsername = $routeParams.user_name;
        $scope.userDetail = {};
        $scope.finishLoading = false;
        $scope.hasVerifiedEmail = true;
        $scope.hasBindId = true;
        $scope.privilege_code = {
            'Add Content' : 10,
            'Edit Content' : 11,
            'Del Content' : 12,
            'View All Content' : 13,

            'Add Problem' : 20,
            'Edit Problem' : 21,
            'Del Problem' : 22,
            'View All Problem' : 23,

            'View All Submission' : 30,
            'Rejudge Submission' : 31,
            'Del Submission' : 32,

            'View Data' : 40,
            'Add Data' : 41,
            'Edit Data' : 42,
            'Del Data' : 43,
            'Upload Data Zip' : 44,

            'Add User' : 50,
            'Edit User' : 51,
            'Del User' : 52,
            'View All Profile' : 53,

            'Add Privilege' : 60,
            'Del Privilege' : 61
        };
        $scope.findPri = function(index) {
            for (var x in $scope.privilege_code) {
                if ($scope.privilege_code[x] == index) {
                    return x;
                }
            }
            return "";
        };

        $scope.verifyCode = function () {
            profileService.verifyCode(function (response) {
                siteService.reload();
            }, $verifyEmailCode);
        };

        $scope.verifyEmail = function () {
            profileService.verifyEmail(function (response) {

            });
        };

        if (profileUsername == null) {
            var tname = userService.getUsername();
            if (tname) {
                $window.location.href = '#/profile/' + tname;
                profileUsername = tname;
            }
            else {
                $window.location.href = '#/login';
            }
        }

        if (profileUsername == userService.getUsername()) {
            $scope.myProfile = true;
        }

        if (profileUsername) {
            profileService.getUserProfile(function (response) {
                $scope.userDetail = {
                    "email" : response.data.email || null,
                    "last_login" : response.data.login_time,
                    "register_time" : response.data.push_time,
                    "privilege" : response.data.roles || null,
                    "solved" : response.data.solved_problem,
                    "trying" : response.data.trying_problem,
                    "userId" : response.data.user_id,
                    "username" : response.data.username,
                    "ustcid" : response.data.ustc_id || null
                };
                //if ($scope.userDetail.privilege.indexOf(1) == -1) {
                    $scope.hasVerifiedEmail = false;
                //}
                //
                if ($scope.userDetail.ustcid == null) {
                    $scope.hasBindId = false;
                }


                //console.log($scope.userDetail);
                $scope.finishLoading = true;
            }, profileUsername);
        }

    });