(function () {
    'use strict';

    angular
        .module('HandyApp', [
            'ngRoute',
            'ngAnimate'
        ])

        // global moment.js library injectable now
        .constant('moment', moment)

        // just the one sample view
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
