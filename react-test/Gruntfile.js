module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.initConfig({
        babel: {
            dist: {
                files: {
                    'app/build/build.js': 'app/js/main.js'
                }
            }
        },

        watch: {
            files: [ 'app/js/*.js' ],
            tasks: [ 'default' ]
        }
    });

    grunt.registerTask('default', [ 'build', 'watch' ]);
    grunt.registerTask('build', [ 'babel' ]);
};