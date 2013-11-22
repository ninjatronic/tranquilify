(function () {
    'use strict';

    angular
        .module('app.control')
        .controller('app.control.main', [
            '$scope', '$state',
            function ($scope, $state) {

                $scope.$state = $state;

                function appPath() {

                    var path = window.location.pathname;
                    return path.substring(0, path.lastIndexOf('/') + 1).replace(/\%20/g, ' ');

                }

                var media = new Media(appPath() + 'media/ocean.mp3');

                $scope.play = function() {
                    $scope.playing = true;
                    media.play({numberOfLoops: -1});
                };

                $scope.pause = function() {
                    delete $scope.playing;
                    media.pause();
                };

            }]);
})();