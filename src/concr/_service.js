/**
 * Created by UNICORE-Concr {{date}}
 */

app.service('{{name}}',[{{inject_parenthesis}}function({{inject_bare}}){
    /* securing logic-existence */
    if(typeof _memory === 'undefined'){
        var _memory = {{{name}}s:{}};
    }
    if(typeof _serviceCall === 'undefined'){
        var _serviceCall = function (endpoint,obj,variable) {
            var name,short = variable.substring(0,variable.length-1);
            if(typeof obj === 'object'){
                name = obj[Object.keys(obj)[0]];
            } else {
                name = obj;
            }
            return $q(function(resolve,reject){
                if(typeof _memory[variable] === 'undefined'){
                    _memory[variable] = {};
                }
                if(typeof _memory[variable][short+'_'+name] !== 'undefined'){
                    resolve(_memory[variable][short+'_'+name]);
                } else {
                    com(endpoint,obj).success(function(data){
                        _memory[variable][short+'_'+name] = data;
                        resolve(_memory[variable][short+'_'+name]);
                    }).error(function(problem){
                        reject(problem);
                    })
                }
            });
        };
    }

    /* {{name}} service */
    return {
        call:function(fnc,obj,variable){
            return _serviceCall('{{name}}::'+fnc,obj,variable);
        },
        byId:function({{name}}_id){
            return _serviceCall('{{name}}::get',{id:{{name}}_id},'{{name}}s');
        }
    };
}]);