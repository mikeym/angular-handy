(function() {
    'use strict';

    // Simple service with an http get call that returns a promise
    function SampleService($q, $http, $log) {
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
                    $log.warn('Error contacting typicode.com. Response: ' + response.status);
                    defer.reject(response);
                });
                return defer.promise;
        }
    }

    angular
        .module('HandyApp')
        .service('SampleService', ['$q', '$http', '$log', SampleService]);
})();
