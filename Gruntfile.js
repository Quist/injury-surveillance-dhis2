module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint : {
            options : {
                jshintrc : true
            },
            application: {
                src: [
                    'app/**/*.js',
                    '!**/app/bower_components/**'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};