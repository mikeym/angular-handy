(function () {
    'use strict';

    // Basic sample screen controller that uses the SampleService for external data retrieval
    // and moment for date and time functions.
    function SampleController($scope, $interval, SampleService, moment) {
        var vm = this,
            cancelInterval;

        vm.errorMessage = null;
        vm.fakeData = null;
        vm.time = getTime;
        vm.today = getDate;

        function getDate() {
            return moment().format("MMMM Do, YYYY");
        }

        function getTime() {
            return moment().format('h:mm:ss a');
        }

        // update date and time once per second
        cancelInterval = $interval(function() {
            vm.today = getDate();
            vm.time = getTime();
        }, 1000);

        // make call to external service, adjust message and data bound propertiesk
        SampleService.getFakeData()
            .then(function success(response) {
                vm.errorMessage = null;
                vm.fakeData = response.data;
            }, function error(response) {
                vm.errorMessage = 'Unable to reach external service.';
                vm.fakeData = null;
            });

        // cleanup
        $scope.$on('$destroy', function() {
            $interval.cancel(cancelInterval);
        });
    }
    
    angular
        .module('HandyApp')
        .controller('SampleController', [ '$scope', '$interval', 'SampleService', 'moment', SampleController ]);
})();
