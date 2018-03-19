/**
 * Created by Stefan on 7/26/2016.
 */
app.config(function($mdThemingProvider,$httpProvider,adalAuthenticationServiceProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('amber')
        .dark();
    adalAuthenticationServiceProvider.init({
            clientId: "9f08d99b-5e4f-4d14-90b4-aef8d2c0e2a9",
            requireADLogin: false,
            anonymousEndpoints: [
                '/'
            ]
        },
        $httpProvider
    );
});
app.controller('frameCtrl',['$scope','$rootScope','$localStorage','$mdDialog','$q','adalAuthenticationService','com',function($scope,$rootScope,$localStorage,$mdDialog,$q,adalAuthenticationService,com){
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
        return $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(text)
                .ariaLabel('Info')
                .ok('Got it!')
        );
    };
    $rootScope.prompt = function(title,cont){
        var confirm = $mdDialog.prompt()
            .title(title)
            .placeholder(cont)
            .ariaLabel(title)
            .ok('Okay!')
            .cancel('cancel');
        return $q(function(resolve,reject){
            $mdDialog.show(confirm).then(function(res) {
                resolve(res);
            }, function() {
                reject(false);
            });
        });
    };
    $rootScope.confirm = function(text){
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent(text)
            .ariaLabel('confirm')
            .ok('Yes, proceed')
            .cancel('Cancel');

        return $mdDialog.show(confirm);
    };
    $scope.logout = function () {
        $scope.$storage.user.signedIn = false;
        com('start::logout').success(function(){
            adalAuthenticationService.logOut();
        });

    };
    $scope.$on("adal:loginFailure", function () {
        $scope.$storage.user.signedIn = false;
        com('start::logout').success(function(){
            adalAuthenticationService.logOut();
        });
    });
}]);