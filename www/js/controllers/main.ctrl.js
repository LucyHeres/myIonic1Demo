/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.main.ctrl', [])
  .controller('mainCtrl', ['$scope', '$rootScope', '$state','$ionicPopup','$ionicHistory','$timeout','$window',
    function ($scope, $rootScope, $state,$ionicPopup,$ionicHistory,$timeout,$window) {
      $rootScope.screenHeight_total = window.screen.height + "px";
      $rootScope.screenHeight_nofoot = window.screen.height - 42 + "px";
      $rootScope.screenHeight_nohead = window.screen.height - 38 + "px";
      $rootScope.screenHeight_content = window.screen.height - 80 + "px";

      $rootScope.screenWidth = window.screen.width + "px";

      //弹框设置
      $rootScope.modelSet = function (modelMsg, callback) {
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
      $rootScope.routerHistory.push({
        path:'tab.dash',
        params:{}
      });
      $scope.jumpTo = function (path, params) {
        try {

        //删除重复跳转路由的记录
          for (var i in $rootScope.routerHistory) {
            if ($rootScope.routerHistory[i].path == path) {
              return
            }
          }
          if(!params){ params={}; }
          $state.go(path,params)
          $rootScope.routerHistory.push({
            path:path,
            params:params
          });

          //if(params){
          //  $state.go(path,params);
          //
          //} else{
          //  $state.go(path);
          //  $rootScope.routerHistory.push({
          //    path:path
          //  });
          //}


        } catch (e) {
          console.log(e);
        }
      };

      $scope.back = function () {
        console.log('路由跳转history表：');
        console.dir($rootScope.routerHistory);
        $rootScope.routerHistory.splice($rootScope.routerHistory.length - 1, 1);
        var goback=$rootScope.routerHistory[$rootScope.routerHistory.length - 1];
        $state.go(goback.path,goback.params);

      }




    }]);
