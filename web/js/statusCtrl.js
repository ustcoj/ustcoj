/**
 * Created by zhaohongzhu on 12/8/16.
 */
angular
    .module('ustc-oj')
    .controller("statusCtrl", function($scope, $http, $rootScope, $window, problemService){

        $scope.statusTrying = {};
        $scope.statusSolved = {};

        problemService.getStatusList(function(response) {

            $scope.statusList = response;
            $scope.statusList.data.submission_list.forEach(function (item) {
                console.log(item);
                if ($scope.getResult(item.result) == "Accepted") {
                    $scope.statusSolved[item.submission_id] = true;
                }
                else if ($scope.getResult(item.result) != "Compile Error") {
                    $scope.statusTrying[item.submission_id] = true;
                }
            })
        }, 1, 20);

        $scope.getResult = function(_resultid) {
            if (problemService.resultList[_resultid] == undefined)
                return "Unexpected Error";
            else return problemService.resultList[_resultid];
        };
        $scope.getLanguage = function(_languageid) {
            //console.log(_languageid);
            return problemService.languageList[_languageid];
        };

        $scope.getMaxTime = function(_data) {


            if (_data.info == undefined) {
                return "-";
            }
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
            if (_data.info == undefined) {
                return "-";
            }
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