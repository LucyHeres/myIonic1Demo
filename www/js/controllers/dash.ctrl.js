/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.dash.ctrl', [])
  .controller('dashCtrl',['$scope','$rootScope',function($scope,$rootScope){
    angular.element(document.querySelector(".dash-three-box")).css("min-height",$rootScope.screenHeight_content);
    //dash-three-box切换
    $scope.active_dashThreeBox=0;
    $scope.dashThreeBox_pages=['templates/dash/recommend.html','templates/dash/sort.html','templates/dash/search.html'];
    $scope.dashThreeBox_page=$scope.dashThreeBox_pages[0];
    $scope.clickChanged_three=function(index){
      $scope.active_dashThreeBox=index;
      $scope.dashThreeBox_page=$scope.dashThreeBox_pages[index];
    };
    //dash-two-label切换
    $scope.active_dashTwoLabel=0;$scope.show_hotbook=true;
    $scope.clickChanged_two=function(index){
      $scope.active_dashTwoLabel=index;
      $scope.show_hotbook=!$scope.show_hotbook;
    }
  }]);

