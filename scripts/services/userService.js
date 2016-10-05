(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', '$state'];

    function userService($http, $state) {
        var user = { token: null, name: null };

        var service = {
            login: login,
            logout: logout,
            register: register,
            user: user
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

                user.token = 'token'; user.name = 'username@email.com'

                callback(response);
            }).error(function (error) {
                console.log('GetContractByParams error POST', error);
            });
        }

        function logout() {
            user = { token: null, name: null };
            $state.go('login');
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