(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$q', '$timeout', '$audio',
            function ($scope, $state, $q, $timeout, $audio) {

                $scope.$state = $state;

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

                $scope.quoteChanging = false;
                $scope.quoteIdx = 0;

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
                    id: 'ocean',
                    title: 'Ocean Sunset'
                }];
                $scope.soundIdx = 0;

                $scope.play = function(id) {
                    $scope.working = true;
                    $audio.load(id).then(function() {
                        $audio.loop(id).then(function() {
                            $scope.playing = true;
                            $scope.working = false;
                        });
                    });
                };

                $scope.pause = function(id) {
                    $scope.working = true;
                    $audio.stop(id).then(function() {
                        $audio.unload(id).then(function() {
                            $scope.playing = false;
                            $scope.working = false;
                        });
                    });
                };

            }]);
})();