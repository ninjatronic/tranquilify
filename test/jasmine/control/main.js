describe('app.control.main', function() {

    var $controller;

    var injected;

    beforeEach(function() {
        module('app.control');
        inject(function($injector) {
            injected = {
                $scope: $injector.get('$rootScope').$new(),
                $state: { },
                $ios7: function() { return true; },
                $localStorage: { }
            };

            $controller = $injector.get('$controller')('app.control.main', injected)
        });
    });

    it('should be defined', function() {
        expect($controller).toBeDefined();
    });

    it('should expose \'$state\' on the $scope', function() {
        expect(injected.$scope.$state).toBe(injected.$state);
    });

    it('should expose \'$ios7\' on the $scope', function() {
        expect(injected.$scope.$ios7).toBe(injected.$ios7);
    });

    it('should expost \'$localStorage\' as \'$storage\' on the $scope', function() {
        expect(injected.$scope.$storage).toBe(injected.$localStorage);
    });
});