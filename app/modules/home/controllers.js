'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope', 'AuthenticationService',
    function ($scope, $rootScope, AuthenticationService) {
        $scope.token = AuthenticationService.token;
    }]);