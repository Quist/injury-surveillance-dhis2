module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint : {
            options : {
                jshintrc : true
            },
            application: {
                src: [
                    'app/components/**/*.js',
                    'app/dashboard/**/*.js',
                    'app/form/**/*.js',
                    'app/apps.js'
                ]
            }
        },

        karma : {
            unit : {
                configFile : 'karma.conf.js',
                singleRun : true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['jshint', 'karma']);
    grunt.registerTask('lint', ['jshint']);
};