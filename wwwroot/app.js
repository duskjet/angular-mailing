angular.module('app', ['ui.router', 'angular-loading-bar', 'ui.bootstrap', 'ui-notification', 'ui.grid', 'ui.grid.pagination']);

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
                url: '/login', templateUrl: 'views/login.html', controller: 'loginController', controllerAs: 'login'
            })
            .state('register', {
                url: '/register', templateUrl: 'views/register.html', controller: 'registerController', controllerAs: 'register'
            })
            .state('logout', {
                controller: function ($injector) {
                    var userService = $injector.get('userService');
                    userService.logout();
                }
            })
            .state('email', {
                abstract: true,
                url: '/email',
                views: {
                    '': { templateUrl: 'views/email.html', controller: 'emailController', controllerAs: 'email' }
                }
            })
            .state('email.new', {
                url: '/email/new',
                views: {
                     '': { templateUrl: 'views/email-new.html' },
                    'composer@email.new': { templateUrl: 'views/email-form.html', controller: 'emailComposerController', controllerAs: 'composer' },
                    'results@email.new': { templateUrl: 'views/email-results.html', controller: 'emailResultsController', controllerAs: 'results' }
                }
            })
            .state('email.history', {
                url: '/email/history',
                templateUrl: 'views/email-history.html', 
                controller: 'emailHistoryController', 
                controllerAs: 'history'
            });
    };
})();

(function () {
    'use strict';

    angular
        .module('app')
        .config(['$httpProvider', 'NotificationProvider', appConfig]);

    function appConfig($httpProvider, notificationProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        notificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    };

})();