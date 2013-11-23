(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$q',
            function ($scope, $state, $q) {

                $scope.$state = $state;

                $scope.working = false;
                $scope.playing = false;

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

                var loader = loadAudio('ocean');

                $scope.play = function() {
                    $scope.working = true;
                    loader.then(function() {
                        loopAudio('ocean').then(function() {
                            $scope.playing = true;
                            $scope.working = false;
                        });
                    });
                };

                $scope.pause = function() {
                    $scope.working = true;
                    stopAudio('ocean').then(function() {
                        $scope.playing = false;
                        $scope.working = false;
                    });
                };

            }]);
})();