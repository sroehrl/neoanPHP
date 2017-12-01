angular.module('video-background', [])

.run(function($templateCache) {

  var tmpl = '<video id="nvideo" poster="https://wanoni.com/img/user_upload/2017/01/28/NjNaZpQnp19.png"></video>' +
                '<div class="video-controls" id="nvideoctl">' +
                  '<md-button class="md-raised md-accent md-big" ng-click="pp()"><i class="fa fa-play"></i></md-button>' +
                '</div>' +
              '</div>';

  $templateCache.put('angular-video-background/main.html', tmpl);
})

.directive('videoBackground', function($log,$timeout,$document) {

  var _scope = {
    source: '=',
    onFirstplay: '&',
    onFirstend: '&'
  };

  var directive = {
    restrict: 'E',
    scope: _scope,
    templateUrl: 'angular-video-background/main.html',
    link: _link
  };

  return directive;

  function _link(scope, elem, attrs) {

    if( !scope.source || !angular.isObject(scope.source) || !Object.keys(scope.source).length ) {
      $log.warn('VideoBg: Expected a valid object, received:', scope.source);
      return;
    }

    var sourceTypes = ['mp4', 'webm', 'ogg'];

    var videoEl = elem.children().eq(0);

    var controlBox = elem.children().eq(1);

    var $video = videoEl[0];

    var controlBoxTimeout;

    $video.firstPlay = true;
    $video.firstEnd = true;

    videoEl.addClass('ng-hide');
    controlBox.addClass('ng-hide');

    videoEl.addClass('video-background');

    for( var key in scope.source ) {
      if( scope.source.hasOwnProperty(key) && sourceTypes.indexOf(key) > -1 ) {
        var tmp = document.createElement('source');
        tmp.src = scope.source[key];
        tmp.type = "video/" + key;
        $video.appendChild( tmp );

      } else {
        $log.warn('videoBg: You passed a type', key, 'that is not valid, must be one of theese: [mp4,webm,ogg]');
      }

    }

    $video.volume = ( attrs.volume && ( 0 <= attrs.volume && attrs.volume <= 1 ) ) ? attrs.volume : 1;

    $video.defaultPlaybackRate = ( attrs.playbackRate ) ? attrs.playbackRate : 1;

    $video.loop = ( typeof attrs.loop !== 'undefined' && attrs.loop !== "false" ) ? true : false;

    scope.pp = function(){
        $video.paused ? $video.play() : $video.pause();
    };
    function onKeyUp(e) {

      if( e.which == 27 ) {
        $video.pause();
        $video.currentTime = 0;
      }

      if( e.which == 32 && !$video.endend ) {
        $video.paused ? $video.play() : $video.pause();
      }

      if( e.which == 37 ) {
        e.preventDefault();
        if($video.currentTime > 0 && $video.currentTime >= 2) {
          $video.currentTime -= 2;
        }
      }

      if( e.which == 39 ) {
        e.preventDefault();
        if($video.currentTime < $video.duration) {
          $video.currentTime += 2;
        }
      }

    }

    /**
     * On first end run callback if specified
     */
    $video.onended = function() {

      if( $video.firstEnd ) {
        $video.firstEnd = false;
        return angular.isFunction(scope.onFirstend) ? scope.$apply(scope.onFirstend()) : true;
      }

    };

    /**
     * When video data is loaded
     */
    $video.onloadeddata = function() {

      $video.currentTime = attrs.startTime ? attrs.startTime : $video.currentTime;
      scope.currentTime = $video.currentTime;

      if( typeof attrs.keyControls !== 'undefined' && attrs.keyControls !== "false"  ) {

        $document.on('keydown', onKeyUp);

        scope.$on('$destroy', function(e) {
          $document.off('keypress', onKeyUp);
        })

      }

      videoEl.removeClass('ng-hide');
      if( typeof attrs.autoplay !== 'undefined' && attrs.autoplay !== "false" ) {
        return $video.play();
      }

    };

    /**
     * Update scope time variable
     */
    $video.ontimeupdate = function() {

      if( attrs.endTime && attrs.endTime <= $video.currentTime ) {
        scope.currentTime = attrs.endTime;
        return $video.currentTime = $video.duration;
      }

      scope.$apply(function() {
        return scope.currentTime = $video.currentTime;
      })

    };

    /**
     * Catch the first play
     */
    var firstStart = true;
    $video.onplay = function() {

      if( $video.firstPlay ) {
        $video.firstPlay = false;
        return angular.isFunction(scope.onFirstplay) ? scope.$apply(scope.onFirstplay()) : true;
      }
    };

    if( attrs.controlBox != 'false' ) {

      /**
      * When the user start seeking
      * show the control box
      */
      $video.onseeking = function() {
        if(!firstStart){
            scope.$apply(function() {
                return controlBox.removeClass('ng-hide');
            });
        }
          firstStart = false;
          console.log('seek fired');
      };

      /**
      * When the seek is finished
      * hide again the control box
      */
      $video.onseeked = function() {

        $timeout.cancel(controlBoxTimeout);
        controlBoxTimeout = $timeout(function() {
          scope.$apply(function() {
            controlBox.addClass('ng-hide');
          })
        }, 2000)
      };

      /**
      * Show the video controls box
      */
      $video.onpause = function() {
        console.log('pause fired');
        $timeout.cancel(controlBoxTimeout);
        controlBox.removeClass('ng-hide');
        controlBoxTimeout = $timeout(function() {
          scope.$apply(function() {
            controlBox.addClass('ng-hide');
          })
        }, 5000)
      }

    }

  }

});
