(function() {
    'use strict';

    // Simple service with an http get call that returns a promise
    function HomeService($q, $http) {
        var svc = {
            getFakeData: getFakeData
        };
        return svc;

        // make a call to the placeholder data service at typicode.com
        function getFakeData() {
            var defer = $q.defer();

            $http.get('http://jsonplaceholder.typicode.com/albums')
                .then(function success(response) {
                    defer.resolve(response);
                }, function error(response) {
                    defer.reject(response);
                });
                return defer.promise;
        }
    }

    angular
        .module('HandyApp')
        .service('HomeService', ['$q', '$http', HomeService]);
})();
