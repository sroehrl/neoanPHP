app.controller('installCtrl',['com','$scope',function(com,$scope){
    $scope.api = false;
    $scope.test = {
        api:function(){
            com('install::testApi').success(function(data){
                if(typeof data.api !== 'undefined'){
                    $scope.api = true;
                }

            })
        },
        user:function(){
            com('install::testUser').success(function(data){

            })
        }
    };
    $scope.test.api();
    $scope.create = {
        database:function(){
            com('install::createDB').success(function(data){
                if(data.success){
                    window.location.reload();
                } else {
                    alert('Please create manually!');
                }
            });
        }
    };

}]);