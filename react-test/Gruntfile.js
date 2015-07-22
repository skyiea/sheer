module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.initConfig({
        babel: {
            dist: {
                files: {
                    'build/build.js': 'app/js/main.js'
                }
            }
        },

        watch: {
            files: [ 'Gruntfile.js', 'app/js/*.js' ],
            tasks: [ 'default' ]
        }
    });

    grunt.registerTask('default', [ 'build', 'watch' ]);
    grunt.registerTask('build', [ 'babel' ]);
};