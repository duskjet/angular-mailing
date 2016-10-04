angular.module('app', ['ui.router']);

(function () {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', appConfig]);

    function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('login', {});
        });
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': { templateUrl: 'views/login.html', controller: 'loginController', controllerAs: 'login' }
                }
            });
            // .state('user.summary', {
            //     url: "/summary",
            //     views: {
            //         '': { templateUrl: '/apps/iacc/views/summary.html', controller: 'summaryCtrl' }
            //     }
            // })
            // .state('user.addresses', {
            //     url: "/addresses",
            //     views: {
            //         '': { templateUrl: '/apps/iacc/views/addresses.html', controller: 'addressesCtrl' }
            //     }
            // })
            // .state('user.billing', {
            //     url: "/billing",
            //     views: {
            //         '': { templateUrl: '/apps/iacc/views/billing.html', controller: 'billingCtrl' }
            //     }
            // })
            // .state('user.others', {
            //     url: "/others",
            //     views: {
            //         '': { templateUrl: '/apps/iacc/views/others.html', controller: 'othersCtrl' }
            //     }
            // })
            // .state('user.notes', {
            //     url: "/notes",
            //     views: {
            //         '': { templateUrl: '/apps/iacc/views/notes.html', controller: 'notesCtrl' }
            //     }
            // });
    };
})();

(function () {
    'use strict';

    angular
        .module('app')
        .config(['$httpProvider', appConfig]);

    function appConfig($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    };

})();