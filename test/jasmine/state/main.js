describe('app.state.main', function() {
    var state;

    beforeEach(function() {
        module('app.state');
        inject(['app.state.main', function(mainState) {
            state = mainState;
        }]);
    });

    it('should be defined', function() {
        expect(state).toBeDefined();
    });

    it('should have url \'/\'', function() {
        expect(state.url).toBe('/');
    });

    it('should have templateUrl \'html/main.html\'', function() {
        expect(state.templateUrl).toBe('html/main.html');
    });

    it('should have controller \'app.control.main\'', function() {
        expect(state.controller).toBe('app.control.main');
    });

    describe('navbar', function() {

        it('should be defined', function() {
            expect(state.navbar).toBeDefined();
        });

        it('should have title \'Team Wild\'', function() {
            expect(state.navbar.title).toBe('Team Wild');
        });

        describe('left', function() {

            it('should be defined', function() {
                expect(state.navbar.left).toBeDefined();
            });

            it('should have title \'Back\'', function() {
                expect(state.navbar.left.title).toBe('Back');
            });

            it('should have target \'main\'', function() {
                expect(state.navbar.left.target).toBe('main');
            });

        });

        describe('right', function() {

            it('should be defined', function() {
                expect(state.navbar.right).toBeDefined();
            });

            it('should have title \'Settings\'', function() {
                expect(state.navbar.right.title).toBe('Settings');
            });

            it('should have target \'main\'', function() {
                expect(state.navbar.right.target).toBe('main');
            });

        });

    });

});