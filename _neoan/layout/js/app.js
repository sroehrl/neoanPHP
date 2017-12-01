/**
 * NEOAN dev-route.
 * NOT USED by UNICORE.
 */
var app = angular.module('neoan',['ngStorage','{{modules}}']);
angular.module('blank',[]);
app.factory('promise',['call','api',function(call,api){
    return {
        call: function(obj){
            return api.call(obj).success(function(data){
                if(typeof data.phppromise !== 'undefined'){

                    api.call(data.phppromise);
                }
            });
        }
    }
}]);

app.factory('api', ['$http', 'call', '$localStorage', function($http, call,$localStorage) {

    return {
        call: function (obj){
            var storage = $localStorage;
            if(typeof storage.client !== 'undefined'){
                obj.client = storage.client;
            }
            return $http.post('{{api-point}}?'+obj.f, obj);
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
        async: function(cl,fu,obj){
            var test = call.promise(cl,fu,obj).then(function(data){
                console.warn(data);
                return data.data;
            });
            return test;
        },
        api: function (obj){
            var storage = $localStorage;
            if(typeof storage.client !== 'undefined'){
                obj.client = storage.client;
            }
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
app.factory('call', ['$http', '$localStorage', '$interval', function($http,$localStorage,$interval){

    return {
        call: function(obj){
            var storage = $localStorage;
            if(typeof storage.client !== 'undefined'){
                obj.client = storage.client;
            }
            var setter ={
                method: 'POST',
                url: '{{api-point}}?'+obj.f,
                headers: {
                    'Content-Type': undefined
                },
                data: obj
            };
            return $http(setter);
        },
        promise: function(obj){
            var storage = $localStorage;
            if(typeof storage.client !== 'undefined'){
                obj.client = storage.client;
            }
            return $http.post('{{api-point}}?'+obj.f, obj).success(function(data){
                if(typeof data.phppromise !== 'undefined'){
                    this.looper(data.phppromise);
                }
            });

        },
        looper: function(phppromise){
            return this.promise(phppromise);
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
(function(){angular.module("ngVidBg",["vidBgTemplate"]).constant("vidBgDefaults",{muted:!0,control:!1,loop:!0,autoPlay:!0,zIndex:-1e3,errorMsg:"Your browser does not support the <code>video</code> element."}).directive("vidBg",["$log","vidBgDefaults",function(e,r){return{restrict:"E",templateUrl:"vidBgTemplate.html",scope:{resources:"=",fullScreen:"=",poster:"=",pausePlay:"=",playInfo:"="},compile:function(e,n){var t,a,o,l;return o=e.children().children(),l=o.eq(0),a=function(e){var r;return r={},angular.isArray(e)&&angular.forEach(e,function(e,n){angular.isString(e)&&(-1!==e.toUpperCase().indexOf(".WEBM",e.length-".WEBM".length)?r.webm=e:-1!==e.toUpperCase().indexOf(".MP4",e.length-".MP4".length)?r.mp4=e:-1!==e.toUpperCase().indexOf(".OGV",e.length-".OGV".length)?r.ogv=e:-1!==e.toUpperCase().indexOf(".SWF",e.length-".SWF".length)&&(r.swf=e))}),r},t=function(e){return o.children().eq(0).attr("src",e.webm?e.webm:""),o.children().eq(1).attr("src",e.mp4?e.mp4:""),o.children().eq(2).attr("src",e.ogv?e.ogv:""),o.children().eq(3).children().eq(0).attr("value",e.swf?e.swf:"")},{pre:function(e,n,t){e.posterUrl=e.poster?e.poster:"",e.resourceMap=a(e.resources),e.muted=e.$parent.$eval(t.muted)||r.muted,e.control=e.$parent.$eval(t.control)||r.control,e.loop=e.$parent.$eval(t.loop)||r.loop,e.autoPlay=e.$parent.$eval(t.autoPlay)||r.autoPlay,e.zIndex=+e.$parent.$eval(t.zIndex)||r.zIndex,e.errorMsg=e.$parent.$eval(t.errorMsg)||r.errorMsg,e.playInfo={buffer:0,played:0}},post:function(e,r,n){return t(e.resourceMap),e.loop||l.on("ended",function(){return this.addClass("vidBg-fade")}),e.$watch("pausePlay",function(e){return e?(l.addClass("vidBg-fade"),l[0].pause()):(l.removeClass("vidBg-fade"),l[0].play())}),e.$watch("resources",function(e){return l.removeClass("vidBg-fade"),l[0].pause(),t(a(e)),l[0].load(),l[0].play()},!0),l.on("progress",function(){return this.buffered.length>0?(e.playInfo.buffer=this.buffered.end(0)/this.duration,e.$apply()):void 0}),l.on("timeupdate",function(){return e.playInfo.played=this.currentTime/this.duration,e.$apply()})}}}}}])}).call(this),function(e){try{e=angular.module("vidBgTemplate")}catch(r){e=angular.module("vidBgTemplate",[])}e.run(["$templateCache",function(e){e.put("vidBgTemplate.html",'<div class="vidBg-container">\n	<video muted="{{muted}}" autoplay="{{autoPlay}}" loop="{{loop}}" class="vidBg-body"\n		ng-style="{ \'background\': \'url(\' + posterUrl + \') #000 no-repeat center center fixed\', \'z-index\': zIndex}"\n		ng-class="{ \'vidBg-fullScreen\' : fullScreen, \'vidBg-autoWidth\' : !fullScreen }">\n		<source type="video/webm">\n		<source type="video/mp4">\n		<source type="video/ogg">\n		<object type="application/x-shockwave-flash" data="{{resourceMap.flash}}">\n			<param name="movie" />\n			<p>Download video as <a href="{{resourceMap.mp4}}">MP4</a>, <a href="{{resourceMap.webm}}">WebM</a>, or <a href="{{resourceMap.ogv}}">Ogg</a>.</p>\n		</object>\n		<div>{{errorMsg}}</div>\n	</video>\n</div>')}])}();
