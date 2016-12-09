app.controller("loginCtrl", function ($scope, $http, $rootScope) {
    $scope.registerFire = function (username, pass, passagain) {
        $http.post($rootScope.apiHost + "/api/register", {params: {
            code: source,
            compiler: lang,
            problem_id: id
        }});
    }
});

var login;
var signup;

function init()
{
    login = document.getElementById("login");
    signup = document.getElementById("signup");


    $("#signup *").prop("disabled", true);
    $("#signup").fadeOut(0);
    signup.style.zIndex = -1;
}

function showlogin()
{
    $("#login *").prop("disabled", false);
    $("#login").fadeIn(0);
    login.style.zIndex = 0;
}

function showsignup()
{
    $("#signup *").prop("disabled", false);
    $("#signup").fadeIn(0);
    signup.style.zIndex = 0;
}


function tologin()
{
    $("#signup *").prop("disabled", true);
    signup.style.zIndex = -1;
    $("#signup").fadeOut(0,showlogin());

}

function tosignup()
{

    $("#login *").prop("disabled", true);
    login.style.zIndex = -1;
    $("#login").fadeOut(0,showsignup());

}