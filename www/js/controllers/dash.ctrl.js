/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.dash.ctrl', ['starter.services'])
  .controller('dashCtrl', ['$scope', '$rootScope', '$$strawberry', '$ionicSlideBoxDelegate','$localStorage',
    function ($scope, $rootScope, $$strawberry, $ionicSlideBoxDelegate,$localStorage) {

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
      /*      推荐页        */
      //轮播图
      function getCarousel() {
        $$strawberry.getCarousel({
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取到轮播图", data.result);
              $scope.carousel = data.result;
              $ionicSlideBoxDelegate.update();
            } else {
              console.log("获取轮播图失败", data.error);
            }

          },
          onError: function () {
          }
        });
      }

      //小喇叭
      function getBroadcast() {
        $$strawberry.getBroadcast({
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取小喇叭内容成功", data.result);
              $scope.broadcast = data.result;
            } else {
              console.log("获取小喇叭内容失败", data.error);
            }

          },
          onError: function () {
          }
        });
      }

      //获取长篇
      function getBookList() {
        $$strawberry.getBookList({
          onSuccess: function (data) {
            if (!data.error) {
              if (data.result.length < 10) {
                $scope.has_more = false;
                console.log("获取到最后的长篇列表，再没有内容了", data.result);
                $scope.bookList = $scope.bookList.concat(data.result);
              } else {
                $scope.has_more = true;
                console.log("获取长篇列表成功", data.result);
                $scope.bookList = $scope.bookList.concat(data.result);
              }
              $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
              console.log("获取长篇列表失败", data.error);
            }

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
            if (!data.error) {
              if (data.result.length < 10) {
                $scope.has_more = false;
                console.log("获取到最后的短篇列表，再没有内容了", data.result);
                $scope.storyList = $scope.storyList.concat(data.result);
              } else {
                $scope.has_more = true;
                console.log("获取短篇列表成功", data.result);
                $scope.storyList = $scope.storyList.concat(data.result);
              }
              $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
              console.log("获取短篇列表失败", data.error);
            }

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
      //滚动置顶 *未实现
      //angular.element(document).ready(function () {
      //  $scope.ele_top=document.getElementsByClassName("dash-two-label")[0].offsetTop;//固定元素位置
      //  console.log($scope.ele_top);
      //});
      //$scope.show_goTopBtn = false;
      //$scope.fun = function () {
      //  $scope.scroll_h = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;//滚动区域滚动过的距离
      //  if ($scope.scroll_h > 500) {
      //    console.log($scope.scroll_h);
      //    $scope.show_goTopBtn = true;
      //  } else {
      //    $scope.show_goTopBtn = false;
      //  }
      //};
      //$scope.goTop = function () {
      //  $ionicScrollDelegate.scrollTop();
      //}
      /*       分类页      */
      //获取轮播图2
      function getCarousel2() {
        $$strawberry.getCarousel2({
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取轮播图2成功", data.result);
              $scope.carousel2 = data.result;
              $ionicSlideBoxDelegate.update();
            } else {
              console.log("获取轮播图2失败", data.error);
            }
          },
          onError: function () {
          }
        });
      }

      //获取分类列表
      function getCategoryList() {
        $$strawberry.getCategoryList({
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取分类列表成功", data.result);
              $scope.categoryList = data.result;
              $ionicSlideBoxDelegate.update();
            } else {
              console.log("获取分类列表失败", data.error);
            }
          },
          onError: function () {
          }
        });
      }

      /*       搜索页      */

      //搜索结果三种
      $scope.search_type = 'novel';
      $scope.changeType_search = function (type) {
        $scope.search_type = type;
        $scope.search();
      }
      //搜索功能
      $scope.searchData = {};
      $scope.showResultBox = false;
      $scope.search = function () {
        $scope.showResultBox = true;
        //$$strawberry.clearSearchHistory();
        var a = $$strawberry.getSearchHistory('searchHistory');
        console.log(a);
        var b= a.push($scope.searchData.keyword);
        console.log(b);
        $$strawberry.setSearchHistory('searchHistory',b);
        $$strawberry.search({
          onSuccess: function (data) {
            if (!data.error) {
              console.log("关键字查找成功", $scope.search_type, data.result);
              $scope.bookListSearch = data.result;
            } else {
              console.log("关键字查找失败", $scope.search_type, data.error);
            }
          },
          onError: function () {
          }
        }, {
          type: $scope.search_type,
          name__contains: $scope.searchData.keyword,
          nick_name__contains: $scope.searchData.keyword,
          limit: 2000
        });
      }
      //清空输入框
      $scope.resetInput = function () {
        $scope.searchData.keyword = "";
      }

      //获得焦点后显示 历史搜索记录
      $scope.showSearchHistory = function () {
      //  $scope.searchHistory = $localStorage.getObject('searchHistory');
      //console.log("@@@@@@@@@@@@@@@@",$scope.searchHistory);
    }
      //监听输入框
      $scope.$watch('searchData.keyword', function () {
        if (!$scope.searchData.keyword) {
          $scope.showResultBox = false;
        } else {
          $scope.search();
        }

      });

      //热门搜索
      function getHotSearch() {
        $$strawberry.getHotSearch({
          onSuccess: function (data) {
            if (!data.error) {
              console.log('获取热门搜索成功', data.result);
              $scope.hotSearchList = data.result;
            } else {
              console.log('获取热门搜索失败', data.error);
            }
          },
          onError: function (e, code) {

          }
        })
      }

      //点击热门词
      $scope.hotSearch = function (hotWord) {
        $scope.searchData.keyword = hotWord;
      }

      //初始化
      var init = function () {
        getCarousel();
        getBroadcast();
        $scope.bookList = [];
        $scope.storyList = [];
        $scope.has_more = false;
        getBookList();
        getStoryList();
        getCarousel2();
        getCategoryList();
        getHotSearch();
      };
      init();
    }]);

