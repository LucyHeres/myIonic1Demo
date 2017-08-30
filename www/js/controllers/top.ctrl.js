/**
 * Created by LiuXin on 2017/8/25.
 */

angular.module('strawberry.top.ctrl', ['starter.services'])
  .controller('topCtrl', ['$scope', '$ionicHistory', '$$strawberry',
    function ($scope, $ionicHistory, $$strawberry) {

      function init_switch() {
        switch ($scope.currentState) {
          case 'top.novel-caomei':
            getTopList('novel-caomei');
            break;
          case 'top.novel-weekread':
            getTopList('novel-weekread');
            break;
          case 'top.author-read':
            getTopList('author-read');
            break;
          case 'top.novel-reward':
            getTopList('novel-reward');
            break;
        }
      }

      $scope.topList = [];
      function getTopList(type) {
        $$strawberry.getTopList({
          onSuccess: function (data) {
            if (!data.error) {
              if (data.result.length < 10) {
                $scope.has_more = false;
                console.log('获取到最后的topList_' + type, data.result);
              } else {
                $scope.has_more = true;
                console.log('获取到topList_' + type, data.result);
              }
              $scope.topList = $scope.topList.concat(data.result);

              if (type == 'novel-reward') {
                for (var i in $scope.topList) {
                  $scope.topList[i] = $scope.topList[i].novel;
                }
              } else if (type == 'author-read') {
                for (var i in $scope.topList) {
                  $scope.topList[i] = $scope.topList[i].author;
                }
              }
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },
          onError: function (e, code) {
            $scope.has_more = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        }, type, $scope.topList.length);

      }

      //作者榜
      $scope.payAttention = true;


      //初始化
      var init = function () {
        $scope.currentState = $ionicHistory.currentStateName();
        console.log('当前路由', $scope.currentState);
        //加载10条内容
        init_switch();
        //获取更多数据
        $scope.has_more = false;
        $scope.getMoreData = function () {
          init_switch();
        }
      };

      init();

    }]);
