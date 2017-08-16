/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.main.ctrl', [])
  .controller('mainCtrl',['$scope','$rootScope',function($scope,$rootScope){
    $rootScope.screenHeight_total = window.innerHeight+"px";
    $rootScope.screenHeight_nofoot = window.innerHeight-47+"px";
    $rootScope.screenHeight_nohead = window.innerHeight-38+"px";
    $rootScope.screenHeight_content = window.innerHeight-85+"px";

    $rootScope.screenWidth = window.innerWidth+"px";
  }]);
