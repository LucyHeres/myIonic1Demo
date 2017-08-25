/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.dash.ctrl', ['starter.services'])
  .controller('dashCtrl', ['$scope', '$rootScope', '$$strawberry', '$ionicSlideBoxDelegate', '$ionicPosition', '$ionicScrollDelegate', '$timeout',
    function ($scope, $rootScope, $$strawberry, $ionicSlideBoxDelegate, $ionicPosition, $ionicScrollDelegate, $timeout) {

      angular.element(document.querySelector(".dash-three-box")).css("min-height", $rootScope.screenHeight_content);
      //dash-three-box切换
      $scope.active_dashThreeBox = 0;
      $scope.dashThreeBox_pages = ['templates/dash/recommend.html', 'templates/dash/sort.html', 'templates/dash/search.html'];
      $scope.dashThreeBox_page = $scope.dashThreeBox_pages[0];
      $scope.clickChanged_three = function (index) {
        $scope.active_dashThreeBox = index;
        $scope.dashThreeBox_page = $scope.dashThreeBox_pages[index];
      };
      //dash-two-label切换
      $scope.active_dashTwoLabel = 0;
      $scope.show_hotbook = true;
      $scope.clickChanged_two = function (index) {
        $scope.active_dashTwoLabel = index;
        $scope.show_hotbook = !$scope.show_hotbook;
      }

      //轮播图
      function getCarousel() {
        $$strawberry.getCarousel({
          onSuccess: function (data) {
            console.log("获取到轮播图", data.result);
            $scope.carousel = data.result;
            $ionicSlideBoxDelegate.update();
            //$ionicSlideBoxDelegate.loop(true);
          },
          onError: function () {
          }
        });
      }

      //小喇叭
      function getBroadcast() {
        $$strawberry.getBroadcast({
          onSuccess: function (data) {
            console.log("获取到小喇叭内容", data.result);
            $scope.broadcast = data.result;
          },
          onError: function () {
          }
        });
      }

      //获取长篇
      function getBookList() {
        $$strawberry.getBookList({
          onSuccess: function (data) {
            if (data.result.length < 10) {
              $scope.has_more = false;
              console.log("获取到最后的长篇列表，再没有内容了", data.result);
              $scope.bookList = $scope.bookList.concat(data.result);
            } else {
              $scope.has_more = true;
              console.log("获取到长篇列表", data.result);
              $scope.bookList = $scope.bookList.concat(data.result);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },
          onError: function () {
            $scope.has_more = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        }, $scope.bookList.length)
      }

      //获取短篇
      function getStoryList() {
        $$strawberry.getStoryList({
          onSuccess: function (data) {
            if (data.result.length < 10) {
              $scope.has_more = false;
              console.log("获取到最后的短篇列表，再没有内容了", data.result);
              $scope.storyList = $scope.storyList.concat(data.result);
            } else {
              $scope.has_more = true;
              console.log("获取到短篇列表", data.result);
              $scope.storyList = $scope.storyList.concat(data.result);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },
          onError: function () {
            $scope.has_more = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        }, $scope.storyList.length)
      }

      $scope.getMoreData = function () {
        if ($scope.show_hotbook) {
          getBookList();
        } else {
          getStoryList();
        }
      };
      //滚动置顶
      //angular.element(document).ready(function () {
      //  $scope.ele_top=document.getElementsByClassName("dash-two-label")[0].offsetTop;//固定元素位置
      //  console.log($scope.ele_top);
      //});
      $scope.show_goTopBtn = false;
      $scope.fun = function () {
        $scope.scroll_h = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;//滚动区域滚动过的距离
        if ($scope.scroll_h > 500) {
          console.log($scope.scroll_h);
          $scope.show_goTopBtn = true;
        } else {
          $scope.show_goTopBtn = false;
        }
      };
      $scope.goTop = function () {
        $ionicScrollDelegate.scrollTop();
      }


      var init = function () {
        getCarousel();
        getBroadcast();
        $scope.bookList = [];
        $scope.storyList = [];
        $scope.has_more = false;
        getBookList();
        getStoryList();
      };
      init();
    }]);

