/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('starter.routers', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'dashCtrl'
          }
        }
      })
      .state('tab.bookshelf', {
        url: '/bookshelf',
        views: {
          'tab-bookshelf': {
            templateUrl: 'templates/tab-bookshelf.html',
            controller: 'bookshelfCtrl'
          }
        }
      })
      .state('tab.publish', {
        url: '/publish',
        views: {
          'tab-publish': {
            templateUrl: 'templates/tab-publish.html',
            controller: 'publishCtrl'
          }
        }
      })
      .state('tab.loop', {
        url: '/loop',
        views: {
          'tab-loop': {
            templateUrl: 'templates/tab-loop.html',
            controller: 'loopCtrl'
          }
        }
      })
      .state('tab.user', {
        url: '/user',
        views: {
          'tab-user': {
            templateUrl: 'templates/tab-user.html',
            controller: 'userCtrl'
          }
        }
      })
      .state('top.caomei',{
        url:'/top-caomei',
        templateUrl:'templates/cao-mei.html',
        controller:'dashCtrl'
      });
    $urlRouterProvider.otherwise('/tab/dash');
  });
