/**
 * Created by zhaohongzhu on 12/8/16.
 */
angular
    .module('ustc-oj')
    .controller("statusCtrl", function($scope, $http, $rootScope, $window, problemService){


    problemService.getStatusList(function(response) {
        console.log(response);
        $scope.statusList = response;
    }, 1, 20);

    $scope.getResult = function(_resultid) {
        //console.log(_resultid);
        for (var i in problemService.resultList) {
            if (problemService.resultList[i] == _resultid) {
                return i;
            }
        }
        return "Unexpected Error";
    };
    $scope.getLanguage = function(_languageid) {
        //console.log(_languageid);
        return problemService.languageList[_languageid];
    };

    $scope.getMaxTime = function(_data) {
        if (_data.info.data[0].result == undefined) {
            return "-";
        }
        var ret = 0;
        for (var t in _data.info.data) {
            if (_data.info.data[t].cpu_time > ret)
                ret = _data.info.data[t].cpu_time;
        }
        return ret;
    };

    $scope.getMaxMem = function(_data) {
        if (_data.info.data[0].result == undefined) {
            return "-";
        }
        var ret = 0;
        for (var t in _data.info.data) {
            if (_data.info.data[t].memory > ret)
                ret = _data.info.data[t].memory;
        }
        return ret;
    }
});