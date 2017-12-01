/**
 * Created by Stefan on 7/26/2016.
 */
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('amber')
        .dark();
});
app.controller('frameCtrl',['$scope','$rootScope','$localStorage','$mdDialog',function($scope,$rootScope,$localStorage,$mdDialog){
    $scope.$storage = $localStorage;
    var handleObj = {
        user: {
            signedIn: false,
            parent_id: null
        },
        virgin: true,
        tasks:[],
        walk:{}
    };
    $scope.$storage = $localStorage.$default(handleObj);

    $rootScope.language = navigator.language || navigator.userLanguage;
    $rootScope.alert = function(text){
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(text)
                .ariaLabel('Info')
                .ok('Got it!')
        );
    };
}]);