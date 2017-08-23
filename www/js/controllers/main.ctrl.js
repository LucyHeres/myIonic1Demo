/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.main.ctrl', [])
  .controller('mainCtrl', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {
      $rootScope.screenHeight_total = window.innerHeight + "px";
      $rootScope.screenHeight_nofoot = window.innerHeight - 47 + "px";
      $rootScope.screenHeight_nohead = window.innerHeight - 38 + "px";
      $rootScope.screenHeight_content = window.innerHeight - 85 + "px";

      $rootScope.screenWidth = window.innerWidth + "px";

      //弹框设置
      $scope.modelSet = function (modelMsg, callback) {
        var modelSetPopup = $ionicPopup.confirm({
          title: modelMsg,
          scope: $scope,
          buttons: [
            {
              text: '<b>关闭</b>',
              type: 'button-assertive',
              onTap: function () {
                if (callback)
                  callback();
              }
            }
          ]
        });
        modelSetPopup.then(function () {
          $ionicListDelegate.closeOptionButtons();
        });
      };

      $rootScope.routerHistory = [];
      $rootScope.routerHistory.push('tab.dash');
      $scope.jumpTo = function (path, id) {
        try {
          $state.go(path);
          for (var i in $rootScope.routerHistory) {
            if ($rootScope.routerHistory[i] == path) {
              return
            } else {
              $rootScope.routerHistory.push(path);
            }
          }
        } catch (e) {
          console.log(e);
        }
      };
      $scope.back = function () {
        console.dir($rootScope.routerHistory);
        $rootScope.routerHistory.splice($rootScope.routerHistory.length - 1, 1);
        $scope.jumpTo($rootScope.routerHistory[$rootScope.routerHistory.length - 1]);
      }
    }]);
