(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state', '$q',
            function ($scope, $state, $q) {

                $scope.$state = $state;

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

                var loader = loadAudio('ocean');

                $scope.play = function() {
                    $scope.playing = true;
                    loader.then(function() {
                        LowLatencyAudio.loop('ocean');
                    });
                };

                $scope.pause = function() {
                    delete $scope.playing;
                    LowLatencyAudio.stop('ocean');
                };

            }]);
})();