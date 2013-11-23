(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$q', '$timeout',
            function ($scope, $state, $q, $timeout) {

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

                /*
                    THIS SECTION DEALS WITH PLAYING THE SOUNDS
                 */

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

                $scope.sounds = [{
                    id: 'ocean',
                    title: 'Ocean Sunset'
                }];

                function loadAudio(id) {
                    var deferred = $q.defer();
                    LowLatencyAudio.preloadAudio(id, 'media/'+id+'.mp3', 2,
                        function() {
                            $scope.$apply(function() {
                                deferred.resolve(id);
                            });
                        }, function() {
                            $scope.$apply(function() {
                                deferred.reject();
                            });
                        });
                    return deferred.promise;
                }

                function loopAudio(id) {
                    var deferred = $q.defer();
                    LowLatencyAudio.loop(id,
                        function() {
                            $scope.$apply(function() {
                                deferred.resolve(id);
                            });
                        }, function() {
                            $scope.$apply(function() {
                                deferred.reject();
                            });
                        });
                    return deferred.promise;
                }

                function stopAudio(id) {
                    var deferred = $q.defer();
                    LowLatencyAudio.stop(id,
                        function() {
                            $scope.$apply(function() {
                                deferred.resolve(id);
                            });
                        }, function() {
                            $scope.$apply(function() {
                                deferred.reject();
                            });
                        });
                    return deferred.promise;
                }

                function unloadAudio(id) {
                    var deferred = $q.defer();
                    LowLatencyAudio.unload(id,
                        function() {
                            $scope.$apply(function() {
                                deferred.resolve(id);
                            });
                        }, function() {
                            $scope.$apply(function() {
                                deferred.reject();
                            });
                        });
                    return deferred.promise;
                }

                $scope.play = function() {
                    $scope.working = true;
                    loadAudio('ocean').then(function() {
                        loopAudio('ocean').then(function() {
                            $scope.playing = true;
                            $scope.working = false;
                        });
                    });
                };

                $scope.pause = function() {
                    $scope.working = true;
                    stopAudio('ocean').then(function() {
                        unloadAudio('ocean').then(function() {
                            $scope.playing = false;
                            $scope.working = false;
                        });
                    });
                };

            }]);
})();