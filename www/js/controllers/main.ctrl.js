/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.main.ctrl', [])
  .controller('mainCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', '$cordovaToast',
    function ($scope, $rootScope, $state, $ionicPopup, $cordovaToast) {

      $rootScope.screenHeight_total = $rootScope.AppHeight + "px";
      $rootScope.screenHeight_nofoot = $rootScope.AppHeight - 42 + "px";
      $rootScope.screenHeight_nohead = $rootScope.AppHeight - 38 + "px";
      $rootScope.screenHeight_content = $rootScope.AppHeight - 80 + "px";

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
        path: 'tab.dash',
        params: {}
      });
      $rootScope.currentStateName=function () {
        return $rootScope.routerHistory[$rootScope.routerHistory.length-1].path;
      }
      $rootScope.jumpTo = function (path, params) {
        try {
          //删除重复跳转路由的记录
          for (var i in $rootScope.routerHistory) {
            if ($rootScope.routerHistory[i].path == path) {
              return
            }
          }
          if (!params) {
            params = {};
          }
          $state.go(path, params);
          if (path.indexOf("tab.") != -1) {
            $rootScope.routerHistory = [];
          }
          $rootScope.routerHistory.push({
            path: path,
            params: params
          });
          console.log('路由跳转history表：');
          console.dir($rootScope.routerHistory);

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

      $rootScope.back = function () {
        var path=arguments[0];console.log(arguments.length);
        if (path) {
          for (var i in $rootScope.routerHistory) {
            if ($rootScope.routerHistory[i].path == path) {
              $rootScope.routerHistory.splice(i + 1);
              $state.go(path);
              return;
            }
          }
        }
        $rootScope.routerHistory.splice($rootScope.routerHistory.length - 1, 1);
        var goback = $rootScope.routerHistory[$rootScope.routerHistory.length - 1];
        $state.go(goback.path, goback.params);
        console.log('路由跳转history表：');
        console.dir($rootScope.routerHistory);
      }

      $rootScope.toast = function (msg) {
        try {
          $cordovaToast.showWithOptions({
            message: msg,
            duration: "short",
            position: "bottom",
            addPixelsY: -60
          });
        } catch (e) {
          console.log(e);
        }

      }


    }]);
