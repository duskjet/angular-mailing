angular.module('app', ['ui.router', 'angular-loading-bar', 'ui.bootstrap', 'ui.grid', 'ui.grid.pagination']);

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
                url: '/email',
                views: {
                    '': { templateUrl: 'views/email.html', controller: 'emailController', controllerAs: 'email' },
                    'composer@email': { templateUrl: 'views/email-form.html', controller: 'emailComposerController', controllerAs: 'composer' },
                    'results@email': { templateUrl: 'views/email-results.html', controller: 'emailResultsController', controllerAs: 'results' }
                }
            });
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