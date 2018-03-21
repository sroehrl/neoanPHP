/**
 * Created by Stefan on 4/21/2017.
 */
app.directive('aceEditor',['$timeout', '$interval',function($timeout,$interval){
    return {
        restrict:'E',
        templateUrl:'{{templateUrl}}',
        scope:{
            code:'@code',
            instance:'@instance',
            release:'&release'
        },
        link:function(scope,ele,attr){

            scope.old = angular.copy(scope.code);
            scope.editor = false;
            if(ace){
                $timeout(function(){

                    scope.editor = ace.edit(scope.instance);
                    scope.editor.setTheme("ace/theme/ambiance");
                    scope.editor.getSession().setMode("ace/mode/"+scope.instance);
                    scope.editor.setShowPrintMargin(false);
                    var session = scope.editor.getSession();
                    scope.editor.setOptions({maxLines:Infinity});
                    session.on("changeAnnotation", function() {
                        var annotations = session.getAnnotations()||[], i = len = annotations.length;
                        while (i--) {
                            if(/doctype first\. Expected/.test(annotations[i].text)) {
                                annotations.splice(i, 1);
                            }
                        }
                        if(len>annotations.length) {
                            session.setAnnotations(annotations);
                        }
                    });

                    scope.resize();
                    if(typeof attr.beautify !== 'undefined'){
                        var beautify = ace.require('ace/ext/beautify');
                        beautify.beautify(scope.editor.session);
                    }
                },100);


            } else {
                console.warn('ACE not included');
            }
            scope.resize = function(){
                var height = scope.editor.getSession().getScreenLength()* scope.editor.renderer.lineHeight+ scope.editor.renderer.scrollBar.getWidth();
                var editinstance = document.getElementById(scope.instance);
                editinstance.style.height = (height+15)+'px';

            };
            scope.reload = function(){
                scope.code = scope.old;
            };
            scope.clear = function(){
                scope.editor.destroy();
            };
            scope.save = function(){
                scope.code = scope.editor.getValue();
                scope.release({code:scope.code});
                scope.resize();
            }
        }
    }
}]);


