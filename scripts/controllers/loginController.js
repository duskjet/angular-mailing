(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope'];

    function loginController($scope) {
        var vm = this;

        vm.form = { username: '', password: '' }

        vm.attemptLogin = function () {
            console.log(vm.form);
        }
    };
})();