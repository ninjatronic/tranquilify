(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$timeout', '$audio', '$window',
            function ($scope, $state, $timeout, $audio, $window) {

                Flipsnap('.flipsnap');

                $scope.$state = $state;

                /*
                    THIS SECTION DISPLAYS MESSAGES ON THE FIRST RUN
                 */

                if($window.localStorage.getItem('firstrun')==null){
                    $window.localStorage.setItem('firstrun','1')
                    $window.alert('Swipe left and right to browse through sounds');
                }

                /*
                    THIS SECTION DEALS WITH THE WORK STATE OF THE APP
                 */

                $scope.working = false;
                $scope.playing = false;


                /*
                    THIS SECTION DEALS WITH LOOPING THE QUOTES
                 */

                $scope.quotes = [{
                    text: 'In the depth of winter I finally learned that there was in me an invincible summer.',
                    from: 'Albert Camus'
                },{
                    text: 'Keep your face to the sunshine and you cannot see a shadow.',
                    from: 'Helen Keller'
                },{
                    text: 'He is richest who is content with the least, for content is the wealth of nature.',
                    from: 'Socrates'
                }];

                $scope.quoteIdx = 0;
                $scope.quoteChanging = false;

                var quoteTime = 20000;
                var quoteTrans = 2000;

                function quoteLoop() {
                    $timeout(function() {
                        $scope.quoteChanging = true;
                        $timeout(function() {
                            $scope.quoteIdx++;
                            if($scope.quoteIdx === $scope.quotes.length) {
                                $scope.quoteIdx = 0;
                            }
                            $scope.quoteChanging = false;
                            quoteLoop();
                        }, quoteTrans);
                    }, quoteTime);
                }
                quoteLoop();

                /*
                    THIS SECTION DEALS WITH PLAYING THE SOUNDS
                 */

                $scope.sounds = [{
                    id: 'shore',
                    title: 'Stony Shore',
                    working: false,
                    playing: false
                },{
                    id: 'fire',
                    title: 'Crackling Fire',
                    working: false,
                    playing: false
                },{
                    id: 'stream',
                    title: 'Cool Stream',
                    working: false,
                    playing: false
                },{
                    id: 'storm',
                    title: 'Rolling Thunder',
                    working: false,
                    playing: false
                },{
                    id: 'birdsong',
                    title: 'Wild Birdsong',
                    working: false,
                    playing: false
                },{
                    id: 'crickets',
                    title: 'Starry Night',
                    working: false,
                    playing: false
                }];

                $scope.play = function(sound) {
                    sound.working = true;
                    $audio.load(sound.id).then(function() {
                        $audio.loop(sound.id).then(function() {
                            sound.playing = true;
                            sound.working = false;
                        });
                    });
                };

                $scope.pause = function(sound) {
                    sound.working = true;
                    $audio.stop(sound.id).then(function() {
                        $audio.unload(sound.id).then(function() {
                            sound.playing = false;
                            sound.working = false;
                        });
                    });
                };

                /*
                    THIS SECTION OPENS EXTERNAL LINKS
                 */

                $scope.link = function(url) {
                    $window.open(url, '_system');
                }

                /*
                    THIS SECTION REMOVES THE COVER AFTER A REASONABLE PERIOD
                 */

                $timeout(function() {
                    $window.navigator.splashscreen.hide();
                }, 100);

            }]);
})();