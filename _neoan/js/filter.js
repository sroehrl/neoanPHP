/**
 * Created by Stefan on 10/18/2015.
 */
app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '...');
    };
});
app.filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});
app.filter('static', function () {
    return function (value) {
        if(!value){
            return '';
        } else {
            return value.replace(/[^a-zA-Z0-9]|\s/g, '-').toLocaleLowerCase();
        }
    };
});

