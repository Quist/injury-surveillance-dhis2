module.exports = function(grunt) {

    var srcFiles = [
        'app/components/**/*.js',
        'app/dashboard/**/*.js',
        'app/form/**/*.js',
        'app/app.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint : {
            options : {
                jshintrc : true
            },
            application: {
                src: srcFiles
            }
        },

        karma : {
            unit : {
                configFile : 'karma.conf.js',
                singleRun : true
            }
        },

        watch: {
            scripts: {
                files: srcFiles,
                tasks: ['test'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('lint', ['jshint']);
};