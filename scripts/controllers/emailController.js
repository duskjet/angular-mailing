(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailController', emailController);

    emailController.$inject = ['$scope', 'emailService', 'userService'];

    function emailController($scope, service, user) {
        console.log('base is firing, all good');
        var vm = this;
        vm.username = 'username@email.com';

        vm.logout = function () {
            user.logout();
        }

        $scope.$on('send-email', function (event, args) {
            console.log('send-email received, ', args);
            service.send(args, user.user.token, function (response) {
                $scope.$broadcast('update-results', response.data)
            });
        });
    };
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailHistoryController', emailHistoryController);

    emailHistoryController.$inject = ['$scope', 'emailService', 'userService'];

    function emailHistoryController($scope, service, user) {

        var vm = this;
        loadHistory();

        vm.historyGrid = {
            enableSorting: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50],
            paginationPageSize: 10,
            data: [],
            columnDefs: [
                { displayName: 'Recepient', field: 'to', width: '20%' },
                { displayName: 'Subject', field: 'subject', width: '30%' },
                {
                    displayName: 'Message', field: 'message', width: '*',
                    cellClass: 'grid-align ui-grid-cell-contents',
                    cellTemplate: '<div ng-click="grid.appScope.viewMessage(row.entity)" style="cursor: pointer">< click to see message ></div>'
                },
            ],
            appScopeProvider: {
                viewMessage: function (mail) {
                    openMessagePopup(mail);
                }
            }
        };

        function loadHistory() {
            service.history(user.user.token, function(response){
                vm.historyGrid.data = response.data;
            })
        }
}})();