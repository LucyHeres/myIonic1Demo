/**
 * Created by LiuXin on 2017/8/25.
 */

angular.module('strawberry.top.ctrl', [])
  .controller('topCtrl',['$scope','$ionicHistory',
    function($scope,$ionicHistory){

      var init=function(){
        $scope.currentCtrl="topCtrl";
        $scope.currentState=$ionicHistory.currentStateName();
        console.log($scope.currentState);
      }
      init();

  }]);
