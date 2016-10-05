(function () {
    'use strict';

    angular
        .module('app')
        .controller('emailComposerController', emailComposerController);

    emailComposerController.$inject = ['$scope'];

    function emailComposerController($scope) {
        var vm = this;
    };
})();