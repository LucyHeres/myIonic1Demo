/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.dash.ctrl', ['starter.services'])
  .controller('dashCtrl', ['$scope', '$rootScope', '$$strawberry', '$ionicSlideBoxDelegate',
    function ($scope, $rootScope, $$strawberry, $ionicSlideBoxDelegate) {
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

      //长篇详情
      function getBookList() {
        $$strawberry.getBookList({
          onSuccess: function (data) {
            console.log("获取到长篇详情", data.result);
            $scope.bookList = data.result;
          },
          onError: function () {
          }
        })
      }
      $scope.moreData=true;
      $scope.getMoreBook=function(){
        $$strawberry.getBookList({
          onSuccess:function(data){
            if(data.result.length>0){
              console.log("获取到长篇详情", data.result);
              $scope.bookList =$scope.bookList.concat(data.result) ;
            }else{
              $scope.moreData=false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },
          onError:function(){
            $scope.moreData = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        },{params:{limit:10,skip:$scope.bookList.length}})
      }


      var init = function () {
        getCarousel();
        getBroadcast();
        $scope.bookList=[];
        getBookList();
      }
      init()
    }])

