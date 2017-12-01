/**
 * Created by neoan on 7/27/2016.
 */
app.controller('concrCtrl',['$scope','api','$localStorage','com',function($scope,api,$localStorage,com){

    console.log('loaded');
    $scope.structure = structure;
    $scope.working = false;
    $scope.$storage = $localStorage;
    $scope.state = false;


    $scope.setSpecs = function(){
        $scope.specs = {
            include: '$scope, $rootScope, $localStorage, com',
            injection:'com, $rootScope',
            api_point: api_point,
            modules: 'ngAnimate, ngStorage, ngAria, ngMaterial, ngMessages'
        };
    };
    $scope.setSpecs();
    $scope.validate = function(receive){
        if(receive.error && receive.error !== false){
            alert(receive.error);
            return false;
        } else {
            return receive;
        }
    };
    $scope.installModel = function(name){
        com('concr::installModel',{name:name}).success(function(data){
            alert('MYSQL ran');
        });
    };

    $scope.create = function(specs,what){
        $scope.working = true;
        if(what ==='elem'){
            api.call({c:'concr',f:'createElement',d:specs}).success(function(data){
                if($scope.validate(data)){
                    window.location.href = data.location;
                }
                $scope.working = false;
            });
        } else if(what ==='directive'){
            api.call({c:'concr',f:'createDirective',d:specs}).success(function(data){
                if($scope.validate(data)){
                    alert('OK');
                }
                $scope.working = false;
                $scope.setSpecs();
                $scope.state = 'element';
            });
        } else if(what ==='model'){
            api.call({c:'concr',f:'createModel',d:specs}).success(function(data){
                if($scope.validate(data)){
                    alert('OK');
                }
                $scope.working = false;
                $scope.setSpecs();

            });
        } else if(what ==='service'){
            api.call({c:'concr',f:'createService',d:specs}).success(function(data){
                if($scope.validate(data)){
                    alert('OK');
                }
                $scope.working = false;
                $scope.setSpecs();
                $scope.state = 'element';
            });
        } else {
            api.call({c:'concr',f:'createFrame',d:specs}).success(function(data){
                if($scope.validate(data)){
                    alert('OK, now create a component');
                    $scope.getFrames();
                    $scope.setSpecs();
                    $scope.state = 'element';

                }
                $scope.working = false;
            });
        }

    };
    $scope.getFrames = function(){
        api.call({c:'concr',f:'getFrames',d:{}}).success(function(data){
            $scope.frames = data;
            if(data.length>0){
                $scope.specs.frame = $scope.frames[0];
            }
        });
    };
    $scope.getFrames();

    api.call({c:'concr',f:'getLocal',d:{}}).success(function(data){
        $scope.specs.includeDirectives ='';
        if(data.directive.length){
            angular.forEach(data.directive,function(directive,i){
                $scope.specs.includeDirectives += (i>0?',':'')+ directive.name;
            });

        }
        $scope.local = data;

    });
    $scope.merge = {
        state:false,
        remotePath:'',
        remoteStructure:{},
        environment:0,
        getLocal:function(){
            $scope.working = true;
            com('concr::siblings',{path:this.remotePath}).success(function(data){
                $scope.merge.remoteStructure = data;
                $scope.working = false;
            });
        },
        navigate: function(folder){
            if(folder){
                this.remotePath += '/'+folder;
            } else {
                var parts = this.remotePath.split('/');
                console.log(parts[parts.length-1]);
                console.log(parts[parts.length-1].length);
                this.remotePath = this.remotePath.slice(0,parts[parts.length-1].length*-1);
            }
            this.getLocal();
        },
        pull:function(folder){
            com('concr::pull',{remote:this.remotePath,folder:folder}).success(function(data){
                console.log(data);
            });
        }
    };
    $scope.$watch('merge.environment',function(){
        if($scope.merge.environment===0){
            $scope.merge.getLocal();
        }

    });
    $scope.add = {
        table:function(){
            if(typeof $scope.specs.tables === 'undefined'){
                $scope.specs.tables = [];
            }
            var fields = [{name:'id',type:'int'}];
            if($scope.specs.tables.length>0){
                fields.push({name:$scope.specs.tables[0].name+'_id',type:'int'});
            }
            fields.push({name:'insert_date',type:'timestamp'});
            fields.push({name:'delete_date',type:'datetime'});
            $scope.specs.tables.push({name:'',fields:fields,primary:'id'})
        },
        field:function(t_ind){
            $scope.specs.tables[t_ind].fields.push({name:'',type:'int'});
        }
    }
}]);