(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', 'API', '$state', 'Notification'];

    function userService($http, apiUrl, $state, notification) {
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
                url: apiUrl.base + apiUrl.login,
                dataType: 'json',
                method: 'POST',
                data: form
            }).success(function (response) {
                console.log(response);
                user.token = 'token'; user.name = 'username@email.com'
                notification.error({message: ""});
                callback(response);
            }).error(function (error) {
                console.error('http error: ', error);
            });
        }

        function logout() {
            console.log('logging out...');
            user = { token: null, name: null };
            $state.go('login');
        }
        function register(form, callback) {
            return $http({
                url: apiUrl.base + apiUrl.register, //"https://httpbin.org/post",
                dataType: 'json',
                method: 'POST',
                data: form
            }).success(function (response) {
                console.log(response);

                user.token = 'token'; user.name = 'username@email.com'

                callback(response);
            }).error(function (error) {
                console.error('http error: ', error);
            });
        }
    };
})();