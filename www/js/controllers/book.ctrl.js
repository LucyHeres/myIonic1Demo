/**
 * Created by LiuXin on 2017/9/1.
 */
angular.module('strawberry.book.ctrl', ['starter.services'])
  .controller('bookCtrl', ['$scope', '$$strawberry', '$stateParams','$state',
    function ($scope, $$strawberry, $stateParams,$state) {
      $scope.add_to_shelf = false;
      $scope.isAndroid = false;

      var bookid = $stateParams.id;
      var authorid = $stateParams.authorid;
      //获取长篇详情
      function getNovelDetail() {
        $$strawberry.getNovelDetail(bookid, {
          onSuccess: function (data) {
            if (!data.error) {
              data.result.word_count = getTotalcount(data.result.chapters);
              getReadCount(bookid);
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

      //获取该长篇总字数
      function getTotalcount(chapters) {
        var res = 0;
        angular.forEach(chapters, function (obj, i) {
          res += obj.word_count;
        })
        return res;
      }

      //获取该长篇阅读数
      function getReadCount(novel_id) {
        $$strawberry.getReadCount(novel_id, {
          onSuccess: function (data) {
            if (!data.error) {
              $scope.readCount = data.result;
            } else {
              console.log("获取该长篇阅读数失败", data.error);
            }
          },
          onError: function () {
          }
        });
      }

      //获取长篇评论列表
      function getNovelComments() {
        $$strawberry.getNovelComments(bookid, {
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取该长篇评论列表成功", data.result);
              $scope.commentList = data.result;
            } else {
              console.log("获取该长篇评论列表失败", data.error);
            }
          },
          onError: function () {
          }
        })
      }


      //获取短篇详情
      function getStoryDetail(){
        $$strawberry.getStoryDetail(bookid, {
          onSuccess: function (data) {
            if (!data.error) {
              //data.result.word_count = getTotalcount(data.result.chapters);
              //getReadCount(bookid);
              console.log("获取短篇详情成功", data.result);
              $scope.book = data.result;
            } else {
              console.log("获取短篇详情失败", data.error);
            }
          },
          onError: function () {
          }
        })
      }

      //获取短篇评论列表
      function getStoryComments() {
        $$strawberry.getStoryComments(bookid, {
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取该短篇评论列表成功", data.result);
              $scope.commentList = data.result;
            } else {
              console.log("获取该短篇评论列表失败", data.error);
            }
          },
          onError: function () {
          }
        })
      }

      var init = function () {
        console.log("当前路由",$state.current.name);
        if($state.current.name=='book.novel-cover'){
          getNovelDetail();
          getNovelComments();
        }else if($state.current.name=='book.story-cover'){
          getStoryDetail();
          getStoryComments();
        }
        else{

        }


      }
      init();
    }]);
