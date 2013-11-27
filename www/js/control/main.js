(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$timeout', '$audio', '$window',
            function ($scope, $state, $timeout, $audio, $window) {

                $scope.$state = $state;

                /*
                    THIS SECTION DEALS WITH THE WORK STATE OF THE APP
                 */

                $scope.working = false;
                $scope.playing = false;


                /*
                    THIS SECTION DEALS WITH LOOPING THE QUOTES
                 */

                $scope.quotes = [
                    { text: 'In the depth of winter I finally learned that there was in me an invincible summer.', from: 'Albert Camus' },
                    { text: 'Keep your face to the sunshine and you cannot see a shadow.', from: 'Helen Keller' },
                    { text: 'He is richest who is content with the least, for content is the wealth of nature.', from: 'Socrates' },
                    { text: 'Peace comes from within. Do not seek it without.', from: 'Buddha' },
                    { text: 'Truth alone will endure, all the rest will be swept away before the tide of time.', from: 'Mahatma Gandhi' },
                    { text: 'We are all in the gutter, but some of us are looking at the stars.', from: 'Oscar Wilde' },
                    { text: ' A happy man is too satisfied with the present to dwell too much on the future.', from: 'Albert Einstein' },
                    { text: 'No soul that seriously and constantly desires joy will ever miss it.', from: 'C.S. Lewis' },
                    { text: 'Affection is the broadest basis of a good life.', from: 'George Eliot' },
                    { text: 'Life is not meant to be easy, my child, but take courage: it can be delightful.', from: 'George Bernard Shaw' },
                    { text: 'The time is always right to do what’s right.', from: 'Martin Luther King' },
                    { text: 'Live, and be happy, and make others so.', from: 'Mary Shelley' },
                    { text: 'Nothing in life is to be feared, it is only to be understood.', from: 'Marie Curie' },
                    { text: 'The essential things in life are seen not with the eyes, but with the heart.', from: 'Antoine de Saint Exupéry' },
                    { text: 'Everyone deserves to believe they are beautiful.', from: 'John Lennon' },
                    { text: 'Choose always the way that seems the best, however rough it may be.', from: 'Pythagoras' },
                    { text: 'Those who bring sunshine into the lives of others cannot keep it from themselves.', from: 'J.M. Barrie' },
                    { text: 'The greatest work that kindness does to others is that it makes them kind themselves.', from: 'Amelia Earhart' },
                    { text: 'If we have no peace, it is because we have forgotten that we belong to each other.', from: 'Mother Teresa' }
                ];
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
                    if($window.navigator.splashscreen) {
                        $window.navigator.splashscreen.hide();
                    }
                    Flipsnap('.flipsnap');
                }, 100);

            }]);
})();