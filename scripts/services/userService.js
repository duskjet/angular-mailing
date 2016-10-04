(function() {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var service = {
            login: login,
            register: register
        };

        return service;

        function login(form, callback) {
            return $http({
                    url: "https://httpbin.org/post",
                    dataType: 'json',
                    method: 'POST',
                    data: form
                }).success(function (response) {
                    console.log('OK GetContractByParams POST', response);
                    response.authToken = "token";
                    callback(response);
                }).error(function (error) {
                    console.log('GetContractByParams error POST', error);
                });
         }

        function register(form, callback) {
            return $http({
                    url: "https://httpbin.org/post",
                    dataType: 'json',
                    method: 'POST',
                    data: form
                }).success(function (response) {
                    console.log('OK GetContractByParams POST', response);
                    response.authToken = "token";
                    callback(response);
                }).error(function (error) {
                    console.log('GetContractByParams error POST', error);
                });
         }
    };
})();