/**
 * Created by zhaohongzhu on 3/4/17.
 */
angular
    .module('ustc-oj')
    .controller("profileCtrl", function($scope, $routeParams, $window, profileService, userService, siteService){

        var profileUsername = $routeParams.user_name;
        $scope.userDetail = {};
        $scope.finishLoading = false;


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

        if (profileUsername) {
            profileService.getUserProfile(function (response) {
                siteService.checkResponse(response);
                $scope.userDetail = {
                    "email" : response.data.email,
                    "last_login" : response.data.login_time,
                    "register_time" : response.data.push_time,
                    "privilege" : response.data.role,
                    "solved" : response.data.solved_problem,
                    "trying" : response.data.trying_problem,
                    "userId" : response.data.user_id,
                    "username" : response.data.username
                };
                console.log($scope.userDetail);
                $scope.finishLoading = true;
            }, profileUsername);
        }

    });