/**
 * Created by LIUXIN on 2017/8/16.
 */
angular.module('starter.directives',[])
.directive("mySubHeader",['$scope','$rootScope',function ($scope,$rootScope) {
  return {
    restrict:'EA',
    template:'<div class="sub-header">' +
    '<div class="btns">' +
    '<div class="icon ion-ios-arrow-back" ng-click="back()"></div>' +
    '</div>' +
    '<div class="title">{{title}}</div>' +
    '<div class="btns">' +
    '<div class="icon ion-ios-more" style="font-size:24px;"></div>' +
    '</div>' +
    '</div>',
    replace:true,
    scope:{
      title:'@title'
    }
  }
}]);




