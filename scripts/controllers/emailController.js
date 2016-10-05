(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailController', emailController);

    emailController.$inject = ['$scope', 'emailService', 'userService'];

    function emailController($scope, service, user) {
        
        var vm = this;
        vm.username = 'username@email.com';

        vm.logout = function() {
            user.logout();
        }

        $scope.$on('send-email', function(event, args){
            console.log('send-email received, ', args);
            service.send(args, user.token, function(response) {
                $scope.$broadcast('update-results', response.data)
            })
        });
    };
})();