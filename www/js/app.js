angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.routers', 'starter.directives', 'starter.filter'])

  .run(function ($rootScope, $ionicPlatform, $cordovaDevice, $cordovaToast,$state) {
    //在这里不能注入 $scope 因为 这里没有写自己的控制器controller
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      // 安卓手机顶部状态栏20px
      try {
        if ($cordovaDevice.getPlatform() == "android") {
              $rootScope.AppHeight = window.screen.height-20;
        } else {
          $rootScope.AppHeight = window.screen.height;
        }
      } catch (e) {
        console.log(e);
        $rootScope.AppHeight = window.screen.height;
      }
    });
    $ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
      if ($state.current.name.indexOf('tab.') == 0) {
        if ($rootScope.backButtonPressedOnceToExit) {
          ionic.Platform.exitApp();
        } else {
          $rootScope.backButtonPressedOnceToExit = true;
          $rootScope.toast("再按一次退出系统");
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
      } else {
        $rootScope.back();
      }
    }, 600);//600为最高权限


  })

  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
  })

