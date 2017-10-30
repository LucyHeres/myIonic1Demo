/**
 * Created by LIUXIN on 2017/8/14.
 */
angular.module('strawberry.chapter.ctrl', ['starter.services', 'slickCarousel'])
  .controller('chapterCtrl', ['$scope', '$rootScope', '$$strawberry', '$stateParams',
    '$state', '$ionicSlideBoxDelegate','$window',
    function ($scope, $rootScope, $$strawberry, $stateParams, $state, $ionicSlideBoxDelegate,$window) {

      var bookid = $stateParams.id;
      var total_chapNum= $stateParams.total_chapNum;

      //设配手机能显示的行列数
      var LINE_MAX = Math.floor((window.screen.height - 20 - 30 - 25) / (26*(window.screen.width/320)));
      var WORD_MAX = Math.floor((320 - 30 - 30) / 16);

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
        $scope.pageLoaded = false;//为了避免 DOM加载 先于数据加载
        var index = parseInt(chapter_index) + 1;
        $$strawberry.getReadChapter({id: bookid, index: index}, {
          onSuccess: function (data) {
            if (!data.error) {
              console.log("获取到第" + index + "章节内容成功", data.result);
              $scope.chapterContent = data.result;
              //给数据分页
              page($scope.chapterContent.content);

              $scope.pageLoaded = true;
            } else {
              console.log("获取到第" + index + "章节内容失败", data.error);
            }
          },
          onError: function () {
          }
        })
      }

      //----------------------给数据分页--start----------------------//
      function page(content) {
        //			分段
        var paragraphs = content.split(/\s+/);
        //删掉数组中的空元素
        for (var i = 0; i < paragraphs.length; i++) {
          if (paragraphs[i] === "") {
            paragraphs.splice(i, 1);
          }
        }
        var linesNum = 0; //每页行数：最大LINE_MAX
        //var wordsNum = 0; //每行字数：最大WORD_MAX
        $scope.lines = []; //所有行
        $scope.pages = []; //所有的页

        for (var i = 0; i < paragraphs.length; i++) {
          var para = paragraphs[i];
          para = "    " + para;
          var _lineNum = Math.ceil(getLength(para) / (WORD_MAX * 2));
          linesNum += _lineNum;
          lineBreak(para, _lineNum);
        }

        var pagesNum = Math.ceil($scope.lines.length / LINE_MAX);
        //     分页
        for (var i = 0; i < pagesNum; i++) {
          $scope.pages.push($scope.lines.slice(0+LINE_MAX * i,(0+LINE_MAX*i)+LINE_MAX));
        }
        console.log('该章节所有!!页',$scope.pages);

      }
      //每段首行缩进
      function suojin(p){
        if(p.slice(0,4)==="    "){
          return true;
        }else{
          return false;
        }
      }
      function lineBreak(para, _lineNum) {
        var _para = para;
        if (_lineNum <= 1) {
          $scope.lines.push({text:_para,suojin:suojin(_para)});
        } else {
          for (var num = 1; num <= _lineNum; num++) {
            if (num < _lineNum) {
              _para = _break(_para);
            } else {
              $scope.lines.push({text:_para,suojin:suojin(_para)});
            }
          }
        }
      }

      function _break(a) {
        var words = "";
        var wordsNum = 0;
        for (var i = 0; i < a.length; i++) {
          var word = a[i];
          words += word;
          wordsNum += getLength(word);
          if (wordsNum >= (WORD_MAX * 2)) {
            $scope.lines.push({text:words,suojin:suojin(words)});
            _para = a.replace(words, "");
            break;
          }
        }
        return _para;
      }

      function getLength(str) {
        var realLength = 0,
          len = str.length,
          charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128)
            realLength += 1;
          else
            realLength += 2;
        }
        return realLength;
      }
      //第一段缩进
      $scope.textIndent={
        "text-indent":"32px"
      }


      //----------------------给数据分页--end----------------------//

      //滑动轮播
      $scope.slickConfig = {
        enabled: true,
        draggable: true,
        event: {
          edge:function(event, slick, direction){
            if($scope.current_chapter_index==0 && $scope.current_chapter_index==total_chapNum){

            }else{
              if(direction=='right'){
                $scope.current_chapter_index -=1;
                chapterContent($scope.current_chapter_index);
              }else if(direction=='left'){
                $scope.current_chapter_index=parseInt($scope.current_chapter_index);
                $scope.current_chapter_index+=1;
                chapterContent($scope.current_chapter_index);
              }else {

              }
            }

          }
        }
      };



      var init = function () {
        if ($state.current.name === 'chapter.menu') {
          getNovelDetail();
        }
        else if ($state.current.name === 'chapter.content') {
          $scope.current_chapter_index = $stateParams.index;
          chapterContent($scope.current_chapter_index);
        }else{

        }
      }
      init();
    }]);
