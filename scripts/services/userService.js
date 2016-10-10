(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', 'API', '$state', 'Notification'];

    function userService($http, apiUrl, $state, notification) {
        var user = { token: null, name: null, email: null };

        var service = {
            login: login,
            logout: logout,
            register: register,
            user: getUserInfo
        };

        return service;

        function getUserInfo() {
            return user;
        }

        function login(form, callback) {
            return $http({
                url: apiUrl.base + apiUrl.login,
                dataType: 'json',
                method: 'POST',
                data: form
            }).success(function (response) {
                if (response.code == 0) {
                    user.token = response.user.token;
                    user.name = response.user.name;
                    user.email = response.user.email;

                    callback(response);
                }
                else {
                    notification.error(response.message);
                }
            }).error(function (error) {
                console.error('http error: ', error);
            });
        }

        function logout() {
            console.log('logging out...');
            user = { token: null, name: null, email: null };
            $state.go('login');
        }
        function register(form, callback) {
            return $http({
                url: apiUrl.base + apiUrl.register, 
                dataType: 'json',
                method: 'POST',
                data: form
            }).success(function (response) {
                if (response.code == 0) {
                    callback(response);
                }
                else {
                    notification.error(response.message);
                }
            }).error(function (error) {
                console.error('http error: ', error);
            });
        }
    };
})();