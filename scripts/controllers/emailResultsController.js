(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailResultsController', emailResultsController);

    emailResultsController.$inject = ['$scope'];

    function emailResultsController($scope) {
        var vm = this;

        vm.historyGrid = {
            enableSorting: true,
            enableColumnMenus: false,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            data: [],
            columnDefs: [
                { displayName: 'Recepient', field: 'to', width: 100 },
                { displayName: 'Subject', field: 'subject', width: 100 },
                { displayName: 'Message', field: 'message', width: 150 },
            ]
        };

        $scope.$on('update-results', function (event, array) {
            var data = JSON.parse(array);
            console.log('updating grid', data);

            var tempArray = vm.historyGrid.data;
            for (var i = 0; i < data.length; i++ ){
                console.log(data[i]);
                tempArray.unshift(data[i]);
            }
            vm.historyGrid.data = tempArray;

            console.log('resulted array: ', vm.historyGrid.data);
        })
    };
})();