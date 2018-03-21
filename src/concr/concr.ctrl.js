/**
 * Created by neoan on 7/27/2016.
 */
app.controller('concrCtrl',['$scope','api','$localStorage','com','$http',function($scope,api,$localStorage,com,$http){

    console.log('loaded');
    $scope.structure = structure;
    $scope.working = false;
    $scope.$storage = $localStorage;
    $scope.state = false;
    $scope.frames = [];
    $scope.newField = {};

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
                $scope.getAll();
            });
        } else if(what ==='model'){
            $http.post(api.setup().api_point,{config:specs.dbFrame,c:'concr',f:'createModel',d:specs}).success(function(data){
                if($scope.validate(data)){
                    alert('OK');
                }
                $scope.working = false;
                $scope.setSpecs();
                $scope.getAll();
                $scope.state = 'editModel';
                $scope.model.load(specs.name);
            });
        } else if(what ==='service'){
            api.call({c:'concr',f:'createService',d:specs}).success(function(data){
                if($scope.validate(data)){
                    alert('OK');
                }
                $scope.working = false;
                $scope.setSpecs();
                $scope.state = 'element';
                $scope.getAll();
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
                $scope.model.frame = $scope.frames[0].name;
            }
        });
    };
    $scope.getFrames();
    $scope.getAll = function(){
        api.call({c:'concr',f:'getLocal',d:{}}).success(function(data){
            $scope.specs.includeDirectives ='';
            if(data.directive.length){
                angular.forEach(data.directive,function(directive,i){
                    $scope.specs.includeDirectives += (i>0?',':'')+ directive.name;
                });

            }
            $scope.local = data;

        });
    };
    $scope.getAll();

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
                if(data.error){
                    alert(data.error);
                } else {

                    $scope.getAll();
                    $scope.getFrames();
                    $scope.state = 'editModel';
                }
            });
        }
    };
    $scope.$watch('merge.environment',function(){
        if($scope.merge.environment===0){
            $scope.merge.getLocal();
        }

    });
    $scope.model = {
        frame:'',
        data:{},
        addEntry:{},
        setup:api.setup(),
        isArray:function(val){
            return Array.isArray(val);
        },
        getData:function(){
            var obj = {frame:this.frame,name:$scope.currentModelName};
            $http.post(this.setup.api_point,{config:this.frame,c:'concr',f:'loadModelData',d:obj}).success(function(data){
                $scope.model.data = data;
                if(data.length<1){
                    alert('empty');
                }
            })
        },
        install:function(){
            $http.post(this.setup.api_point,{config:this.frame,c:'concr',f:'installModel',d:{name:$scope.currentModelName}})
                .success(function(){
                    alert('MYSQL ran');
                    $scope.model.load($scope.currentModelName);
                });

        },
        put:function(entries){
            $http.post(this.setup.api_point,{config:this.frame,c:'concr',f:'putModelData',d:entries})
            .success(function(){
                $scope.model.addEntry = {};
            });
        },
        load:function(name){
            var obj = {name:name,frame:this.frame};
            $http.post(this.setup.api_point,{config:this.frame,c:'concr',f:'loadModel',d:obj}).success(function(data){
                $scope.currentModel = data;
                $scope.currentModelName = name;
                if(typeof data.error === 'undefined'){
                    angular.forEach($scope.currentModel,function(table,i){
                        $scope.currentModel[i].compared = {};
                        $scope.currentModel[i].showAdd = false;
                        $scope.installer = table.db.length < 1;
                        angular.forEach(table.db,function(db){
                            if(typeof $scope.currentModel[i].compared[db.name] === 'undefined'){
                                $scope.currentModel[i].compared[db.name] = {};
                            }
                            $scope.currentModel[i].compared[db.name].db = db;
                        });
                        angular.forEach(table.fields,function(field){
                            if(typeof $scope.currentModel[i].compared[field.name] === 'undefined'){
                                $scope.currentModel[i].compared[field.name] = {};
                            }
                            $scope.currentModel[i].compared[field.name].mod = field;
                        })
                    })
                }

            })
        },
        add:function(ind,field){
            field.default = null;
            if(field.dataType === 'timestamp'){
                field.default = 'CURRENT_TIMESTAMP';
            }
            field.nullable = field.dataType === 'datetime';
            $scope.currentModel[ind].fields.push(field);
            com('concr::saveMigration',{model:$scope.currentModel,name:$scope.currentModelName}).success(function(){
                $scope.model.load($scope.currentModelName);
                $scope.newField = {};
            });
        },
        delete:function(parent,key){
            var proceed = confirm('Are you sure?');
            if(proceed){
                var handle = [];
                angular.forEach($scope.currentModel[parent].fields,function(field){
                    if(field.name !== key){
                        handle.push(field);
                    }
                });
                $scope.currentModel[parent].fields = handle;
                com('concr::saveMigration',{model:$scope.currentModel,name:$scope.currentModelName}).success(function(){
                    $scope.model.load($scope.currentModelName);
                });
            }

        },
        migrate:function(ind){
            var proceed = confirm('Are you sure?');
            if(!proceed){
                return true;
            }
            var toMigrate = {alter:[],add:[],drop:[]};
            angular.forEach($scope.currentModel[ind].compared,function(value,key){
                if(typeof value.mod === 'undefined'){
                    toMigrate.drop.push(key);
                } else if(typeof value.db === 'undefined'){
                    toMigrate.add.push(value.mod);
                } else {
                    if(value.mod.dataType!==value.db.dataType
                        ||value.mod.nullable!==value.db.nullable
                        ||value.mod.default!==value.db.default){
                        toMigrate.alter.push(value.mod);
                    }
                }

            });
            var obj = {migrate:toMigrate,frame:$scope.model.frame,table:$scope.currentModel[ind].table_name,modelName:$scope.currentModelName};
            $http.post(this.setup.api_point,{config:$scope.model.frame,c:'concr',f:'migrate',d:obj}).success(function(){
                $scope.model.load($scope.currentModelName);
            });
        }
    };
    $scope.add = {
        table:function(){
            if(typeof $scope.specs.tables === 'undefined'){
                $scope.specs.tables = [];
            }
            var fields = [{name:'id',dataType:'int'}];
            if($scope.specs.tables.length>0){
                fields.push({name:$scope.specs.tables[0].table_name+'_id',dataType:'int'});
            }
            fields.push({name:'insert_date',dataType:'timestamp'});
            fields.push({name:'delete_date',dataType:'datetime'});
            $scope.specs.tables.push({table_name:'',fields:fields,primary:'id'})
        },
        field:function(t_ind){
            $scope.specs.tables[t_ind].fields.push({name:'',dataType:'int'});
        }
    }
}]);