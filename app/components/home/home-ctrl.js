(function () {
    'use strict';

    // Basic home screen controller with a couple of properties for binding
    function HomeController($scope, $interval, HomeService) {
        var vm = this,
            destroyInterval;

        // today's date
        vm.today = moment().format("MMMM Do, YYYY");

        // current time
        vm.time = moment().format('h:mm:ss a');

        // update date and time once per second
        destroyInterval = $interval(function() {
            vm.today = moment().format("MMMM Do, YYYY");
            vm.time = moment().format('h:mm:ss a');
        }, 1000);

        // make call to external service
        vm.fakeData = null;
        HomeService.getFakeData()
            .then(function success(response) {
                vm.fakeData = response.data;
            }, function error(response) {
                // todo
            });

        // cleanup
        $scope.$on('$destroy', destroyInterval);
    }
    
    angular
        .module('HandyApp')
        .controller('HomeController', ['$scope', '$interval', 'HomeService', HomeController]);
})();
