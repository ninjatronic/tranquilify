(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$timeout', '$audio', '$window',
            function ($scope, $state, $timeout, $audio, $window) {

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

                var soundTrans = 300;

                $scope.sounds = [{
                    id: 'ocean',
                    title: 'Ocean Sunset',
                    working: false,
                    playing: false
                },{
                    id: 'rainforest',
                    title: 'Rainforest',
                    working: false,
                    playing: false
                }];
                $scope.soundIdx = 0;
                $scope.soundChanging = false;

                $scope.play = function(index) {
                    console.log(index);
                    $scope.sounds[index].working = true;
                    $audio.load($scope.sounds[index].id).then(function() {
                        $audio.loop($scope.sounds[index].id).then(function() {
                            $scope.sounds[index].playing = true;
                            $scope.sounds[index].working = false;
                        });
                    });
                };

                $scope.pause = function(index) {
                    $scope.sounds[index].working = true;
                    $audio.stop($scope.sounds[index].id).then(function() {
                        $audio.unload($scope.sounds[index].id).then(function() {
                            $scope.sounds[index].playing = false;
                            $scope.sounds[index].working = false;
                        });
                    });
                };

                $scope.next = function() {
                    $scope.soundChanging = true;
                    $timeout(function() {
                        $scope.soundIdx++;
                        if($scope.soundIdx === $scope.sounds.length) {
                            $scope.soundIdx = 0;
                        }
                        $scope.soundChanging = false;
                    }, soundTrans);
                };

                $scope.previous = function() {
                    $scope.soundChanging = true;
                    $timeout(function() {
                        $scope.soundIdx--;
                        if($scope.soundIdx === -1) {
                            $scope.soundIdx = $scope.sounds.length - 1;
                        }
                        $scope.soundChanging = false;
                    }, soundTrans);
                };

            }]);
})();