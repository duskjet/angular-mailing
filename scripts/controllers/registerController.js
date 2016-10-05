(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    registerController.$inject = ['$scope'];

    function registerController($scope) {
        var vm = this;

        vm.form = { username: '', password: '', repeatPassword: '' }

        vm.tryRegister = function (form) {
            console.log(form);
        }
    };
})();