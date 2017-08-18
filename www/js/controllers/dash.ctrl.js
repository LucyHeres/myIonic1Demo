/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.dash.ctrl', [])
  .controller('dashCtrl',['$scope','$rootScope',function($scope,$rootScope){
    //dash-three-box切换
    $scope.active_dashThreeBox=0;
    $scope.pages=['templates/dash/recommend.html','templates/dash/sort.html','templates/dash/search.html'];
    $scope.p=$scope.pages[0];
    $scope.clickChanged_three=function(index){
      $scope.active_dashThreeBox=index;
      $scope.p=$scope.pages[index];
    };
    angular.element(document.querySelector(".dash-three-box")).css("min-height",$rootScope.screenHeight_content);
    //dash-two-label切换
    $scope.active_dashTwoLabel=0;
    $scope.clickChanged_two=function(index){
      $scope.active_dashTwoLabel=index;
    }
  }]);
