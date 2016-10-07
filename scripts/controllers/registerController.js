(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    registerController.$inject = ['$scope', 'userService', '$state'];

    function registerController($scope, service, $state) {
        var vm = this;

        vm.form = { username: '', password: '', repeatPassword: '' }

        vm.samePasswords = function (form) {
            return vm.form.password != vm.form.repeatPassword;
        }

        vm.tryRegister = function (form) {
            service.register(form, function (response) {
                $state.go('email.new');
            });
        }
    };
})();