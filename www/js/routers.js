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
      .state('top',{
        url:'/top',
        templateUrl:'templates/top/top-index.html',
        abstract: true
      })
      .state('top.novel-weekread',{
        url:'/novel-weekread',
        templateUrl:'templates/top/novel-weekread.html',
        controller:'topCtrl'
      })
      .state('top.author-read',{
        url:'/author-read',
        templateUrl:'templates/top/author-read.html',
        controller:'topCtrl'
      })
      .state('top.novel-reward',{
        url:'/novel-reward',
        templateUrl:'templates/top/novel-reward.html',
        controller:'topCtrl'
      })
      .state('top.novel-caomei',{
        url:'/novel-caomei',
        templateUrl:'templates/top/novel-caomei.html',
        controller:'topCtrl'
      })
      .state('book',{
        url:'/book',
        templateUrl:'templates/book/book-index.html',
        abstract:true
      })
      .state('book.novel-cover',{
        url:'/novel-cover/:id/:authorid',
        templateUrl:'templates/book/novel-cover.html',
        controller:'bookCtrl'
      })
      .state('book.story-cover',{
        url:'/story-cover/:id',
        templateUrl:'templates/book/story-cover.html',
        controller:'bookCtrl'
      })
      .state('chapter',{
        url:'/chapter',
        templateUrl:'templates/chapter/chapter-index.html',
        abstract:true
      })
      .state('chapter.menu',{
        url:'/menu/:id',
        templateUrl:'templates/chapter/chapter-menu.html',
        controller:'chapterCtrl'
      })
      .state('chapter.content',{
        url:'/content/:id/:index/:total_chapNum',
        templateUrl:'templates/chapter/chapter-content.html',
        controller:'chapterCtrl'
      })







    $urlRouterProvider.otherwise('/tab/dash');
  });
