var app = angular.module('neoan',['{{modules}}']);
angular.module('blank',[]);

app.run(function(){
    var preload = document.getElementById('container-loads');
    if(preload !== null){
        preload.style.display = 'none';
    }

});
app.factory('i18n',['$http','$q','$rootScope',function($http,$q,$rootScope){
    return {
        translate: function(keys,arr){
            return $q(function(resolve,reject){
                var handle = {
                    frame:'{{config}}',
                    keys:keys,
                    array: arr
                };
                if(typeof $rootScope.language !== 'undefined'){
                    handle.language = $rootScope.language;
                }

                $http.post('{{base}}/_neoan/base/i18n.php', handle).then(function(data){
                    resolve(data.data);
                },function(){
                    reject(arr);
                })
            });

        }
    }
}]);
app.factory('com', ['api','$rootScope',function(api){
    return function(where,what){
        return api.post(where,what);
    }
}]);

app.factory('api', ['$http', 'call', '$localStorage', function($http, call,$localStorage) {
    return {
        post: function(direction,obj){
            var par = direction.split('::');
            return call.call({c:par[0],f:par[1],d:obj});
        },
        call: function (obj){
            return call.call(obj);
        },
        get: function (func, obj) {
            return call.call({c:'get', f:func, d:obj});
        },
        put: function (func, obj) {
            return call.call({c:'put', f:func, d:obj});
        },
        delete: function (func, obj){
            return call.call({c:'delete', f:func, d:obj});
        },
        setup: function(){
            return {
                config: '{{config}}',
                api_point: '{{api-point}}'
            }
        },
        api: function (obj){
            var api = $localStorage.$default({
                generic: {
                    key: false,
                    promise: {}
                }
            });
            var handle = {
                cont: obj,
                generic: api.generic
            };
            return $http.post('{{api-point}}', handle).success(function(data){
               if(typeof data.generic !== 'undefined'){
                   api.key = data.generic.key;
                   if(typeof data.generic.promise !== 'undefined'){
                       api.api(data.generic.promise);
                   }
               }
            });
        }
    }
}]);
app.factory('call', ['$http', function($http){
    return {
        call: function(obj){
            obj.config = '{{config}}';
            var apiKey = '';
            var setter ={
                method: 'POST',
                url: '{{api-point}}?'+obj.f,
                headers: {
                    'Content-Type': undefined
                },
                data: obj
            };
            return $http(setter);
        }
    }
}]);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };
}]);
app.factory('socket', function ($localStorage,$rootScope,$q) {
    var socket;
    if(io){
        socket = io('{{socket}}',{
            autoConnect: false
        });
    }
    return {
        connect:function(){
            return $q(function(resolve){
                socket.open();
                socket.on('connect',function(){
                    resolve(socket.id);
                })
            });

        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {

            if(typeof $localStorage.user.handshake !== 'undefined'){
                data.neoan_handshake = $localStorage.user.handshake;
            }
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        whisper: function(data,user_id){
            var obj = {
                to:this.getUser(user_id),
                data:data
            };

            this.emit('whisper',obj);
        },
        getUser:function(user_id){
            var found = false;
            angular.forEach($localStorage.online,function(online){

                if(online.user_id==user_id){
                    found = online.socket_id;
                }
            });
            return found;
        }
    };
});
