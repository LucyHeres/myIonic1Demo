/**
 * Created by LIUXIN on 2017/8/16.
 */
angular.module('starter.directives',[])
.directive("mySubHeader",function () {
  return {
    restrict:'EA',
    template:'<div class="sub-header">' +
    '<div class="btns">' +
    '<div class="icon ion-ios-arrow-back" ng-click="leftBtnClick()" ng-if="hasLeft"></div>' +
    '</div>' +
    '<div class="title">{{title}}{{msg}}</div>' +
    '<div class="btns">' +
    '<div class="icon ion-ios-more" style="font-size:24px;" ng-click="rightBtnClick()" ng-if="hasRight"></div>' +
    '</div>' +
    '</div>',
    replace:true,
    scope:{
      title:'@title',
      leftBtn:'&',
      rightBtn:'&'
    },
    controller:
      ['$scope','$attrs',function($scope,$attrs) {
        $scope.leftBtnClick=function(){
          $scope.leftBtn();
        }
        $scope.rightBtnClick=function(){
          $scope.rightBtn();
        }
        $scope.hasLeft = angular.isDefined($attrs.leftBtn)?true:false;
        $scope.hasRight =angular.isDefined($attrs.rightBtn)?true:false;
      }]
  }
})


