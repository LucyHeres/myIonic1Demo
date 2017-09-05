/**
 * Created by LiuXin on 2017/9/1.
 */
angular.module('strawberry.book.ctrl', ['starter.services'])
  .controller('bookCtrl', ['$scope', '$$strawberry', '$stateParams',
    function ($scope, $$strawberry, $stateParams) {
      $scope.add_to_shelf = false;
      $scope.isAndroid = false;

      var bookid = $stateParams.id;
      var authorid = $stateParams.authorid;

      function getNovelDetail() {
        $$strawberry.getNovelDetail(bookid, {
          onSuccess: function (data) {
            console.log(data.result);
          },
          onError: function () {

          }
        })
      }


      var init = function () {
        getNovelDetail();
      }
      init();
    }]);
