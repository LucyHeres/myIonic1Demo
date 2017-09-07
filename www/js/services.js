angular.module('starter.services', [])

  .factory('$$strawberry', ['$http', '$rootScope',
    function ($http, $rootScope) {
      var backend = {
        ip: 'https://www.caomeikankan.com',
        getCarousel: "/api/carousel/list/",
        getNovelList: "/api/novel/list/",
        getStoryList: "/api/story/list/",
        getBroadcast: "/api/broadcast/list/",
        getCarousel2: "/api/carousel-in-category/list/",
        getCategoryList: "/api/category/list/",
        getHotSearch: "/api/hot-keywords/list/",
        getTopList: "/api/top/",
        getNovelDetail:"/api/novel/detail/",
        getStoryDetail: "/api/story/detail/",
        read: "/api/read/",
        getCommentList: "/api/comment/list/",
        getReadChapter:"/api/novel/chapter/"
      }
      var popError = false;//是否已弹出过错误提示
      var _get = function (url, options, params) {
        _config = {
          method: 'get',//请求方式
          url: backend.ip + url,//请求地址
          params: {}
        };
        if (params) {
          _config.params = params;
        }
        $http(_config)
          .success(function (backend) {
            options.onSuccess(backend);
          }).error(function (e, code) {
            //网络连接失败，处理
            if (!popError) {
              $rootScope.modelSet("error！"+code);
              popError = true;
            }
            options.onError(e, code);
          });
      };
      var _post = function (url, options, config) {
        _config = {
          method: 'POST',
          url: backend.ip + url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          backend: $.param(backend)
        }
        if (config) {
          for (var i in config) {
            _config[i] = config[i];
          }
        }
        $http(_config)
          .success(function (backend) {
            options.onSuccess(backend);
          })
          .error(function (e, code) {
            options.onError(e, code);
          });
      }
      var _post_form = function () {
        $http.post(backend.ip + backend.insert_book_short, backend, {
          headers: {
            'Content-Type': undefined,
            'USER-TOKEN': $rootScope.user.token,
          },
          transformRequest: angular.identity
        })
          .success(function (backend) {
            options.onSuccess(backend);
          })
          .error(function (e, code) {
            options.onError(e, code);
          });
      }

      return {
        //dash页-推荐页
        getCarousel: function (options) {
          _get(backend.getCarousel, options);
        },
        getNovelList: function (options, params) {
          _get(backend.getNovelList, options, {limit: 10, skip: params})
        },
        getStoryList: function (options, params) {
          _get(backend.getStoryList, options, {limit: 10, skip: params})
        },
        getBroadcast: function (options) {
          _get(backend.getBroadcast, options);
        },
        //dash页-分类页
        getCarousel2: function (options) {
          _get(backend.getCarousel2, options);
        },
        getCategoryList: function (options) {
          _get(backend.getCategoryList, options);
        },
        //dash页-搜索页
        getHotSearch: function (options) {
          _get(backend.getHotSearch, options);
        },
        search: function (options, params) {
          _get('/api/' + params.type + '/list/', options, params);
        },
        //dash页-4个top榜
        getTopList: function (options, type, params) {
          _get(backend.getTopList + type + '/', options, {limit: 10, skip: params});
        },
        getNovelDetail:function(data,options){
          _get(backend.getNovelDetail + data + '/', options);
        },
        getStoryDetail:function(data,options){
          _get(backend.getStoryDetail + data + '/', options);
        },
        getReadCount:function(data,options){
          _get(backend.read + data + '/', options);
        },
        getNovelComments:function(data,options){
          _get(backend.getCommentList, options,{novel:data,limit:5});
        },
        getStoryComments:function(data,options){
          _get(backend.getCommentList, options,{story:data,limit:5});
        },
        getReadChapter:function(data,options){
          _get(backend.getReadChapter+data.id+"/"+data.index+"/", options);
        }
      }
    }
  ])
