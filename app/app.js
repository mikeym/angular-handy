(function () {
    'use strict';

    angular.module('HandyApp', [
            'ngRoute',
            'ngAnimate'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/sample', {
                templateUrl: 'components/sample/sample-view.html'
                // controller is loaded in the template
            })
            .otherwise({
                redirectTo: '/sample'
            });
        }]);
})();
