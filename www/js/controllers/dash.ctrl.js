/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.dash.ctrl', [])
  .controller('dashCtrl',['$scope','$rootScope',function($scope,$rootScope){

    $scope.showActive=0;
    $scope.pages=['templates/dash/recommend.html','templates/dash/sort.html','templates/dash/search.html'];
    $scope.p=$scope.pages[0];
    $scope.slideChanged=function(index){
      $scope.showActive=index;
      $scope.p=$scope.pages[index];
    };
      angular.element(document.querySelector(".dash-three-box")).css("height",$rootScope.screenHeight_content);
  }]);
