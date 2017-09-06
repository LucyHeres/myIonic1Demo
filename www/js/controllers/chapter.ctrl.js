/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.chapter.ctrl', ['starter.services'])
  .controller('chapterCtrl', ['$scope', '$$strawberry', '$stateParams','$state',
    function ($scope, $$strawberry, $stateParams,$state) {

      var bookid=$stateParams.id;

    //获取长篇详情
    function getNovelDetail() {
      $$strawberry.getNovelDetail(bookid, {
        onSuccess: function (data) {
          if (!data.error) {
            console.log("获取长篇详情成功", data.result);
            $scope.book = data.result;
          } else {
            console.log("获取长篇详情失败", data.error);
          }
        },
        onError: function () {

        }
      })
    }


    var init=function(){
      getNovelDetail();
    }
    init();
  }]);
