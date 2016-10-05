(function () {
    'use strict';

    angular
        .module('app')
        .factory('emailService', emailService);

    emailService.$inject = ['$http'];

    function emailService($http) {
        var service = {
            send: send
        };

        return service;

        function send(messages, token, callback) {
            return $http({
                url: "https://httpbin.org/post",
                dataType: 'json',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                data: messages
            }).success(function (response) {
                console.log('OK GetContractByParams POST', response);
                callback(response);
            }).error(function (error) {
                console.log('GetContractByParams error POST', error);
            });
        }
    };
})();