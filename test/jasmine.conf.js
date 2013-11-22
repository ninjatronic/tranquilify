module.exports = function(config) {
    config.set({
        singleRun: true,
        basePath: '../',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'www/lib/angular/angular.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/lib/angular-cookies/angular-cookies.js',
            'www/lib/angular-resource/angular-resource.js',
            'www/lib/angular-ui-router/release/angular-ui-router.js',
            'www/lib/ngBase64/ngBase64.js',
            'www/lib/ngstorage/ngStorage.js',

            'www/js/app.js',
            'www/js/state/module.js',
            'www/js/control/module.js',
            'www/js/service/module.js',

            'www/js/**/*.js',

            'test/jasmine/**/*.js'
        ]
    });
};
