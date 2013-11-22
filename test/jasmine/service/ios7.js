describe('app.service.ios7', function() {

    var $rootScope, $document, $window;
    var $ios7;

    beforeEach(function() {
        module(function($provide) {
            $provide.value('$window', {
                navigator: {
                    userAgent: 'sample'
                },
                document: [document]
            });
        });
        angular.module('test',[]);
        module('app.service', 'test');
        inject(function($injector) {

            $document = $injector.get('$document');
            $rootScope = $injector.get('$rootScope');
            $window = $injector.get('$window');

            $ios7 = $injector.get('$ios7');
        });
    });

    it('should be defined', function() {
        expect($ios7).toBeDefined();
    });

    describe('before the device is ready', function() {

        it('should return false', function() {
            expect($ios7()).toBe(false);
        });

    });

    describe('once the device is ready', function() {
        var event;

        beforeEach(function() {
            event = $document[0].createEvent('HTMLEvents');
            event.initEvent('deviceready', true, true);
        });

        describe('if the device is not an iPad/iPhone/iPod', function() {

            beforeEach(function() {
                $window.navigator.userAgent = 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>)';
                $document[0].dispatchEvent(event);
            });

            it('should return false', function() {
                expect($ios7()).toBe(false);
            });

        });

        describe('if the device is an iPad/iPhone/iPod', function() {
            angular.forEach(['iPad', 'iPhone', 'iPod'], function(deviceType) {

                describe('if device does not exist', function() {

                    it('should return false', function() {
                        $window.navigator.userAgent = deviceType;
                        if('device' in $window) { delete $window.device; }
                        $document[0].dispatchEvent(event);
                        expect($ios7()).toBe(false);
                    });

                });

                describe('if device exists', function() {

                    describe('if version < 7.0', function() {

                        it('should return false', function() {
                            $window.navigator.userAgent = deviceType;
                            $window.device = {version: 6.1};
                            $document[0].dispatchEvent(event);
                            expect($ios7()).toBe(false);
                        });

                    });

                    describe('if version == 7.0', function() {

                        it('should return true', function() {
                            $window.navigator.userAgent = deviceType;
                            $window.device = {version: 7.0};
                            $document[0].dispatchEvent(event);
                            expect($ios7()).toBe(true);
                        });

                    });

                    describe('if version > 7.0', function() {

                        it('should return true', function() {
                            $window.navigator.userAgent = deviceType;
                            $window.device = {version: 7.1};
                            $document[0].dispatchEvent(event);
                            expect($ios7()).toBe(true);
                        });

                    });

                });

            });
        });

    });

});