/**
 * Created by zhaohongzhu on 3/4/17.
 */
angular
    .module('ustc-oj')
    .controller("profileCtrl", function($scope, $routeParams, $window, $location, profileService, userService, siteService){


        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
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
            'Del Privilege' : 61,

            'View All News' : 70,
            'Add News' : 71,
            'Edit News' : 72
        };
        $scope.findPri = function(index) {
            for (var x in $scope.privilege_code) {
                if ($scope.privilege_code[x] === index) {
                    return x;
                }
            }
            return "";
        };

        $scope.verifyCode = function () {
            profileService.verifyCode(function (response) {
                siteService.reload();
            }, $scope.verifyEmailCode);
        };

        $scope.resendEmail = function () {
            profileService.verifyEmail(function (response) {
                $scope.hasResend = true;
            });
        };

        $scope.bindUSTCId = function () {
            if (!siteService.atUSTC()) {
                siteService.showAlert("ID binding is only available in oj.ustc.edu.cn");
                return;
            }
            if (userService.isLoggedIn() && !$scope.userDetail.hasBindId) {
                var des = siteService.bindDestination;
                var url = "https://passport.ustc.edu.cn/login?&service=" + des;
                window.location.replace(url);
            }
        };

        if (profileUsername == null) {
            var tname = userService.getUsername();
            if (tname) {
                $location.path("/profile/" + tname).replace();
                // $window.location.href = '#/profile/' + tname;
                profileUsername = tname;
            }
            else {
                $window.location.href = '#/login';
            }
        }

        if (profileUsername === userService.getUsername()) {
            $scope.myProfile = true;
        }

        if (profileUsername) {
            profileService.getUserProfile(function (response) {
                $scope.userDetail = {
                    "email" : response.data.email || null,
                    "last_login" : response.data.login_time,
                    "register_time" : response.data.push_time,
                    "privilege" : response.data.roles || [],
                    "solved" : response.data.solved_problem || [],
                    "trying" : response.data.trying_problem || [],
                    "userId" : response.data.user_id,
                    "username" : response.data.username,
                    "ustcid" : response.data.student_id || null
                };
                var vEmail = $scope.userDetail.privilege.indexOf(1);
                if ($scope.userDetail.privilege.indexOf(1) === -1) {
                    $scope.hasVerifiedEmail = false;
                }
                else {
                    $scope.userDetail.privilege.splice(vEmail, 1);
                }

                if ($scope.userDetail.ustcid == null) {
                    $scope.hasBindId = false;
                }

                $scope.finishLoading = true;
            }, profileUsername)
        }
    });