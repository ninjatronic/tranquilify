(function () {
    'use strict';

    angular
        .module('app.service')
        .provider('$audio', [function () {
            return {
                $get: ['$rootScope', '$q', function ($rootScope, $q) {

                    function load(id) {
                        var deferred = $q.defer();
                        LowLatencyAudio.preloadAudio(id, 'media/'+id+'.mp3', 2,
                            function() {
                                $rootScope.$apply(function() {
                                    deferred.resolve(id);
                                });
                            }, function() {
                                $rootScope.$apply(function() {
                                    deferred.reject();
                                });
                            });
                        return deferred.promise;
                    }

                    function loop(id) {
                        var deferred = $q.defer();
                        LowLatencyAudio.loop(id,
                            function() {
                                $rootScope.$apply(function() {
                                    deferred.resolve(id);
                                });
                            }, function() {
                                $rootScope.$apply(function() {
                                    deferred.reject();
                                });
                            });
                        return deferred.promise;
                    }

                    function stop(id) {
                        var deferred = $q.defer();
                        LowLatencyAudio.stop(id,
                            function() {
                                $rootScope.$apply(function() {
                                    deferred.resolve(id);
                                });
                            }, function() {
                                $rootScope.$apply(function() {
                                    deferred.reject();
                                });
                            });
                        return deferred.promise;
                    }

                    function unload(id) {
                        var deferred = $q.defer();
                        LowLatencyAudio.unload(id,
                            function() {
                                $rootScope.$apply(function() {
                                    deferred.resolve(id);
                                });
                            }, function() {
                                $rootScope.$apply(function() {
                                    deferred.reject();
                                });
                            });
                        return deferred.promise;
                    }

                    var api = {
                        load: load,
                        loop: loop,
                        stop: stop,
                        unload: unload
                    };
                    return api;

                }]
            }
        }]);
})();