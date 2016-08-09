'use strict';

describe('HandyApp SampleService tests', function() {
    var sampleService,
        httpBackend,
        log,
        successResponse = {
            data: [
                {userId: 1, id: 1, title: 'toads in gravy'},
                {userId: 2, id: 2, title: 'frog surprise'}
            ]
        };

    beforeEach(module('HandyApp'));
    beforeEach(inject(function ($httpBackend, SampleService, $log) {
        sampleService = SampleService;
        httpBackend = $httpBackend;
        log = $log;

        // To test logging behavior
        spyOn(log, 'warn');
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getFakeData function', function() {
        expect(sampleService.getFakeData).toBeDefined();
        expect(angular.isFunction(sampleService.getFakeData)).toBeTruthy();
    });

    describe('SampleService tests where the external service call succeeds', function() {

        beforeEach(function() {

            // When we ask for search results, succeed and return some data
            httpBackend.when('GET', 'http://jsonplaceholder.typicode.com/albums')
                .respond(200, successResponse);
        });

        it('should return expected data when external API call succeeds', function() {
            var successData,
                errorData;

            // call service, expect the success path
            sampleService.getFakeData()
                .then(function (data) {
                    successData = data;
                },function(data) {
                    errorData = data;
                });

            httpBackend.flush();

            expect(successData.data).toEqual(successResponse);
            expect(successData.status).toEqual(200);
            expect(errorData).toBeUndefined();
            expect(log.warn).not.toHaveBeenCalled();

        });
    });

    describe('SampleService tests where the external service call fails', function() {

        beforeEach(function() {

            // When we ask for search results, fail
            httpBackend.when('GET', 'http://jsonplaceholder.typicode.com/albums')
                .respond(404);
        });

        it('should return expected data when external API call fails', function() {
            var successData,
                errorData;

            // call service, expect the error path
            sampleService.getFakeData()
                .then(function (data) {
                    successData = data;
                },function(data) {
                    errorData = data;
                });
            httpBackend.flush();

            expect(successData).toBeUndefined();
            expect(errorData.status).toEqual(404);
            expect(log.warn)
                .toHaveBeenCalledWith('Error contacting typicode.com. Response: 404');

        });
    });

});
