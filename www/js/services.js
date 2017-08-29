angular.module('starter.services', [])

  .factory('$$strawberry', ['$http','$rootScope', function ($http,$rootScope) {
    var data = {
      ip: 'https://www.caomeikankan.com',
      getCarousel: "/api/carousel/list/",
      getBookList: "/api/novel/list/",
      getStoryList: "/api/story/list/",
      getBroadcast:"/api/broadcast/list/",
      getCarousel2: "/api/carousel-in-category/list/",
      getCategoryList: "/api/category/list/",
      getHotSearch: "/api/hot-keywords/list/",
      getTopList: "/api/top/"
    }
    var popError=false;//是否已弹出过错误提示
    var _get = function (url, options, params) {
      _config = {
        method: 'get',//请求方式
        url: data.ip + url,//请求地址
        params:{}
      };
      if (params) {
        _config.params = params;
      }
        $http(_config)
          .success(function (data) {
            options.onSuccess(data);
          }).error(function (e, code) {
            //网络连接失败，处理
            if(!popError){
              //$rootScope.modelSet('网络连接失败');
              popError=true;
            }
            options.onError(e, code);
          });
    };
    var _post = function (url,options,config) {
      _config={
          method: 'POST',
          url: data.ip + url,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param(data)
      }
      if (config) {
        for (var i in config) {
          _config[i] = config[i];
        }
      }
      $http(_config)
        .success(function (data) {
          options.onSuccess(data);
        })
        .error(function (e, code) {
          options.onError(e, code);
        });
    }
    var _post_form = function () {
      $http.post(backend.ip + backend.insert_book_short, data, {
        headers: {
          'Content-Type': undefined,
          'USER-TOKEN': $rootScope.user.token,
        },
        transformRequest: angular.identity
      })
        .success(function (data) {
          options.onSuccess(data);
        })
        .error(function (e, code) {
          options.onError(e, code);
        });
    }

    return {
      //dash页-推荐页
      getCarousel: function (options) {
        _get(data.getCarousel, options);
      },
      getBookList: function (options,params) {
        _get(data.getBookList, options,{limit:10,skip:params})
      },
      getStoryList: function (options,params) {
        _get(data.getStoryList, options,{limit:10,skip:params})
      },
      getBroadcast:function(options){
        _get(data.getBroadcast,options);
      },
      //dash页-分类页
      getCarousel2:function(options){
        _get(data.getCarousel2,options);
      },
      getCategoryList:function(options){
        _get(data.getCategoryList,options);
      },
      //dash页-搜索页
      getHotSearch:function(options){
        _get(data.getHotSearch,options);
      },
      search:function(options,params){
        _get('/api/'+params.type+'/list/',options,params);
      },
      getTopList:function(options,type,params){
        _get(data.getTopList+type+'/',options,{limit:10,skip:params});
      }
    }
  }
  ])


