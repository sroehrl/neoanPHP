/**
 * Created by Stefan on 9/2/2015.
 */

app.directive('numeric',[function(){
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^0-9]/g, '');
                if(transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);
app.directive('alpha',[function(){
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^A-z]/g, '');
                if(transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);
app.directive('mdJustified', function() {
    return {
        restrict : 'A',
        compile : function(element, attrs)  {
            var layoutDirection = 'layout-'+ (attrs.mdJustified || "row");

            element.removeAttr('md-justified');
            element.addClass(layoutDirection);
            element.addClass("layout-align-space-between-stretch");

            return angular.noop;
        }
    };
});
app.directive('refreshable', [function () {
    return {
        restrict: 'A',
        scope: {
            refresh: "=refreshable"
        },
        link: function (scope, element, attr) {
            var refreshMe = function () {
                element.attr('src', element.attr('src'));
            };

            scope.$watch('refresh', function (newVal, oldVal) {
                if (scope.refresh) {
                    scope.refresh = false;
                    refreshMe();
                }
            });
        }
    };
}]);
app.directive('fileRead', function() {
    return {
        restrict : "A",
        link: function (scope, elem) {
            elem.bind('drop', function(evt) {
                evt.stopPropagation();
                evt.preventDefault();

                var files = evt.dataTransfer.files;
                for (var i = 0, f; f = files[i]; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(f);

                    reader.onload = (function(theFile) {
                        return function(e) {
                            console.log(theFile);
                        };
                    })(f);
                }
            });
        }
    }
});
app.directive('onEnter',function() {

    var linkFn = function(scope,element,attrs) {
        element.bind("keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.onEnter);
                });
                event.preventDefault();
            }
        });
    };

    return {
        link:linkFn
    };
});