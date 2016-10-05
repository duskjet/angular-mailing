(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailResultsController', emailResultsController);

    emailResultsController.$inject = ['$scope'];

    function emailResultsController($scope) {
        var vm = this;

        $scope.$on('update-results', function(event, args){
            console.log('updating grid',args);
        })
    };
})();