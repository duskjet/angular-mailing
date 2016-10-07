(function () {
    'use strict';

    angular.module('app')
        .constant('API', {
            base: 'https://httpbin.org',

            login: '/post',
            logout: '/post',
            register: '/post',
            email: '/post'
        });

})();