angular.module('strawberry.login.ctrl', ['starter.services'])
  .controller('loginCtrl',['$scope','$$strawberry',function($scope,$$strawberry){
    $scope.currentCtrl="loginCtrl";
    $scope.account={
      account: "",
      password: ""
    };

    $scope.login=function () {
      console.log($scope.account);
      $$strawberry.login($scope.account,{
        onSuccess:function (data) {
          console.log("success",data);
        },
        onError:function () {

        }
      })
    }
  }]);
