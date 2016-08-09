'use strict';

describe('HandyApp main app configuration tests', function() {
    var route;
    
    beforeEach(module('HandyApp'));
    beforeEach(inject(function($route) {
        route = $route;
    }));

    it('should have the correct route values for the sample view', function() {
        expect(route.routes['/sample']).not.toBeNull();
        expect(route.routes['/sample'].templateUrl).toEqual('components/sample/sample-view.html')
        expect(route.routes['/sample'].controller).toBeUndefined(); // loaded by the template
    });

});
