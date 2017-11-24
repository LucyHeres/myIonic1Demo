/**
 * Created by LIUXIN on 2017/8/16.
 */
angular.module('starter.directives',['starter.controllers'])
.directive("mySubHeader",function () {
  return {
    restrict:'EA',
    template:'<div class="sub-header">' +
    '<div class="btns">' +
    '<div class="icon ion-ios-arrow-back" ng-click="leftBtnClick()" ng-if="hasLeft"></div>' +
    '</div>' +
    '<div class="title">{{title}}{{msg}}</div>' +
    '<div class="btns">' +
    '<div class="{{rightBtnIcon}}" style="font-size:24px;" ng-click="rightBtnClick()" ng-if="hasRight"></div>' +
    '</div>' +
    '</div>',
    replace:true,
    scope:{
      title:'@',
      leftBtn:'@',
      leftBtnPara:'@',
      rightBtn:'@',
      rightBtnPara:'@',
      rightBtnIcon:'@'
    },
    controller:
      ['$scope','$attrs','$rootScope',function($scope,$attrs,$rootScope) {
        $scope.leftBtnClick=function(){
          var fun=$scope.leftBtn;
          if(angular.isDefined($attrs.leftBtnPara)){
            if($rootScope[fun]){
              $rootScope[fun]($attrs.leftBtnPara);
            }else{
              $scope[fun]($attrs.leftBtnPara);
            }
          } else {
            if($rootScope[fun]){
              $rootScope[fun]();
            }else{
              $scope[fun]();
            }
          }
        }
        $scope.rightBtnClick=function(){
          var fun=$scope.rightBtn;
          if(angular.isDefined($attrs.rightBtnPara)){
            if($rootScope[fun]){
              $rootScope[fun]($attrs.rightBtnPara);
            }else{
              $scope[fun]($attrs.rightBtnPara);
            }
          } else {
            if($rootScope[fun]){
              $rootScope[fun]();
            }else{
              $scope[fun]();
            }
          }
        }
        $scope.hasLeft = angular.isDefined($attrs.leftBtn)?true:false;
        $scope.hasRight = angular.isDefined($attrs.rightBtn)?true:false;
      }]
   }
})


