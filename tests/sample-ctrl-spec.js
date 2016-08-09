'use strict';

describe('HandyApp SampleController tests', function() {
    var ctrl,
        scope,
        sampleService,
        q,
        interval,
        successResponse = {
            data: [
                {userId: 1, id: 1, title: 'toads in gravy'},
                {userId: 2, id: 2, title: 'frog surprise'}
            ]
        },
        errorResponse = {status: 404};

    beforeEach(module('HandyApp'));

    // Tests when the SampleService.getFakeData call succeeds and returns data
    describe('service call succeeds and responds with data', function () {

        beforeEach(inject(function ($controller, $rootScope, $document, $compile, $interval,
                                    SampleService, $q) {
            scope = $rootScope.$new();
            sampleService = SampleService;
            q = $q;
            interval = $interval;

            // For tests that succeed, we mock the service call and return a successful promise
            spyOn(sampleService, 'getFakeData').and.callFake(function () {
                var def = q.defer();
                def.resolve(successResponse);
                return def.promise;
            });

            // Create the controller, but don't compile it or apply scope, as we want to test initial
            // property values.
            ctrl = $controller('SampleController as sc', {
                $scope: scope,
                $interval: $interval,
                SampleService: SampleService
            });
        }));

        // because we haven't applied scope, our properties should still be null
        it('should have an initially null "errorMessage" property', function () {
            expect(ctrl.errorMessage).toBeDefined();
            expect(ctrl.errorMessage).toBeNull();
        });

        it('should have an initially null "fakeData" property', function () {
            expect(ctrl.fakeData).toBeDefined();
            expect(ctrl.fakeData).toBeNull();
        });

        it('should have a "time" function that returns a formatted time string', function () {
            expect(ctrl.time).toBeDefined();
            expect(angular.isFunction(ctrl.time)).toBeTruthy();
            expect(ctrl.time()).toEqual(moment().format('h:mm:ss a'));
        });

        it('should have a "today" function that returns a formatted date string', function () {
            expect(ctrl.today).toBeDefined();
            expect(angular.isFunction(ctrl.today)).toBeTruthy();
            expect(ctrl.today()).toEqual(moment().format("MMMM Do, YYYY"));
        });

        it('should fill "fakeData" collection and clear "errorMessage" when SampleService.getFakeData succeeds', function () {
            // put something in the properties so we can verify they're being correctly set
            ctrl.errorMessage = 'Toad Pants!';
            ctrl.fakeData = 'Beans!';

            // after applying scope the service is called and our properties should be as expected
            scope.$apply();
            expect(ctrl.errorMessage).toBeNull();
            expect(ctrl.fakeData).toEqual(successResponse.data);
        });

        it('should clear the clock interval when the controller is destroyed', function() {
            spyOn(interval, 'cancel');
            scope.$destroy();
            expect(interval.cancel).toHaveBeenCalled();
        })
    });

    // Tests when the SampleService.getFakeData call fails and we want to display an error message
    describe('service call fails', function () {

        beforeEach(inject(function ($controller, $rootScope, $document, $compile, $interval,
                                    SampleService, $q) {
            scope = $rootScope.$new();
            sampleService = SampleService;
            q = $q;

            spyOn(sampleService, 'getFakeData').and.callFake(function () {
                var def = q.defer();
                def.reject(errorResponse);
                return def.promise;
            });

            ctrl = $controller('SampleController as sc', {
                $scope: scope,
                $interval: $interval,
                SampleService: SampleService
            });
        }));

        it('should fill in the "errorMessage" and clear "fakeData" when SampleService.getFakeData fails', function () {
            ctrl.errorMessage = 'Horse Feathers!';
            ctrl.fakeData = 'Cheese!';

            scope.$apply(); // service will be called, but will fail
            expect(ctrl.errorMessage).toEqual('Unable to reach external service.');
            expect(ctrl.fakeData).toBeNull();
        });

    });

});
