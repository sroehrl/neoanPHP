/**
* Created by UNICORE-Concr 05/23/2017
*/
app.controller('neoanCtrl',[
    '$scope',
    'com',
    '$rootScope',
    function($scope,com,$rootScope){

        /* Display-function triggered through button in view */
        $scope.display = function(){
            /* com-factory calls internal API calls (post)
             * first argument is the destination CLASS::FUNCTION
             * second argument (optional) carries data (json-object) */
            com('neoan::displayYourself').success(function(data){
                $scope.code = data;
            });
        };
        /* No saving here */
        $scope.release = function(any){
            $rootScope.alert('No changes here, my friend.');
        }

    }
    ]
);