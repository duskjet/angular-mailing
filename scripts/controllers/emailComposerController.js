(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailComposerController', emailComposerController);

    emailComposerController.$inject = ['$scope', 'emailService', 'userService'];

    function emailComposerController($scope, service, user) {
        var vm = this;

        vm.form = {
            from: $scope.$parent.email.username,
            to: 'ruka, v govne',
            subject: 'subject',
            message: 'message message',
        };

        vm.send = function (form) {
            $scope.$emit('send-email', form);
        }
    };
})();