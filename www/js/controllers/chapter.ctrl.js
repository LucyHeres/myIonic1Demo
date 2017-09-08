/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.chapter.ctrl', ['starter.services'])
  .controller('chapterCtrl', ['$scope', '$$strawberry', '$stateParams', '$state','$ionicSlideBoxDelegate',
    function ($scope, $$strawberry, $stateParams, $state,$ionicSlideBoxDelegate) {

      var bookid = $stateParams.id;

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

      function chapterContent(chapter_index) {
        var index=parseInt(chapter_index)+1;
        $$strawberry.getReadChapter({id: bookid, index: index}, {
          onSuccess: function (data) {
            $ionicSlideBoxDelegate.update();
            if (!data.error) {
              console.log("获取到第" + index + "章节内容成功", data.result);
              $scope.chapterContent = data.result;
              //处理 拿到的文章内容





              //分段
              $scope.paragraphs=$scope.chapterContent.content.split(/\s+/);
              console.log($scope.paragraphs);
            }else{
              console.log("获取到第" + index + "章节内容失败", data.error);
            }
          },
          onError: function () {
          }
        })
      }


      //分页
      //
      //function page(){
      //  var page_height=$rootScope.screenHeight_total-60-30;
      //  var line_count = page_height/24;
      //  var height = document.getElementByClassName('content')[0]
      //}
      var init = function () {
        if ($state.current.name == 'chapter.menu') {
          getNovelDetail();
        }
        else if ($state.current.name == 'chapter.content') {
          var chapter_index = $stateParams.index;
          chapterContent(chapter_index);
        }

      }
      init();
    }]);
