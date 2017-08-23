angular.module('starter.services', [])

  .factory('$$strawberry', ['$http', function ($http) {
    var data = {
      ip: 'https://www.caomeikankan.com',
      getCarousel: "/api/carousel/list/",
      getBookList: "/api/novel/list/",
      getBroadcast:"/api/broadcast/list/"
    }

    var _get = function (url, options, config) {
      _config = {
        method: 'get',//请求方式
        url: data.ip + url//请求地址
      };
      if (config) {
        for (var i in config) {
          _config[i] = config[i];
        }
        console.log(_config);
      }


        $http(_config)
          .success(function (data) {
            options.onSuccess(data);
          }).error(function (e, code) {
            //网络连接失败，处理
            //$scope.modelSet('网络连接失败');
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
      getCarousel: function (options) {
        _get(data.getCarousel, options);
      },
      getBookList: function (options,config) {
        _get(data.getBookList, options,config)
      },
      getBroadcast:function(options){
        _get(data.getBroadcast,options);
      }

    }
  }
  ])


