module.exports = function (grunt) {
    var app_path = 'app/',
        build_path = 'public/';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: [ build_path + '*' ],

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: app_path,
                        src: [
                            'json/**'
                        ],
                        dest: build_path
                    }
                ]
            }
        },

        webpack: {
            options: require('./webpack.config'),
            build: {}
        },

        watch: {
            files: [ 'Gruntfile.js', 'webpack.config.js', app_path + '**' ],
            tasks: [ 'build' ]
        }
    });

    grunt.registerTask('build', [ 'clean', 'webpack', 'copy' ]);
    grunt.registerTask('default', [ 'build', 'watch' ]);
};