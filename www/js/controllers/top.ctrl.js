/**
 * Created by LiuXin on 2017/8/25.
 */

angular.module('strawberry.top.ctrl', ['starter.services'])
  .controller('topCtrl', ['$scope', '$ionicHistory', '$$strawberry',
    function ($scope, $ionicHistory, $$strawberry) {

      $scope.topList = [];
      function getTopList(type) {
        $$strawberry.getTopList({
          onSuccess: function (data) {
            if (!data.error) {
              if (data.result.length < 10) {
                console.log('获取到最后的topList_' + type, data.result);
              } else {
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
          },
          onError: function (e, code) {
          }
        }, type, $scope.topList.length);

      }

      //作者榜
      $scope.payAttention = true;





      //初始化
      var init = function () {
        $scope.currentState = $ionicHistory.currentStateName();
        console.log($scope.currentState);

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
      };
      init();

    }]);
