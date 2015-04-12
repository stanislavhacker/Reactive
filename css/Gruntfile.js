module.exports = function(grunt) {

	// Project configuration.

	//files spec
	var files = [
			'src/dom.cssGenerator.js'
		],
		specs = [
			'../dom/dist/Reactive.min.js',
			'test/**/*.js'
		],
		watch = [
			'src/**/*.js',
			'test/**/*.js'
		],
		gruntFile = [
			'Gruntfile.js'
		];


	//noinspection JSUnresolvedFunction
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Clean task

		clean: {
			js: ["dist/*.js"],
			bin: ["bin/**/**"]
		},

		//Jasmine task

		jasmine: {
			pivotal: {
				src: files,
				options: {
					specs: specs
				}
			},
			coverage: {
				src: files,
				options: {
					specs: specs,
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'bin/coverage/coverage.json',
						report: {
							type: 'html',
							options: {
								dir: 'bin/coverage/html'
							}
						}
					}
				}
			},
			options: {
				keepRunner: true
			}
		},

		//Connect task

		connect: {
			server: {
				options: {
					port: 8888,
					keepalive: true
				}
			}
		},

		//Concat task

		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: files,
				// the location of the resulting JS file
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		//Uglify task

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},

		//Watch task

		watch: {
			scripts: {
				files: watch,
				tasks: ['jasmine'],
				options: {
					interrupt: true
				}
			},
			grunt: {
				files: gruntFile,
				tasks: ['concat'],
				options: {
					interrupt: true
				}
			}
		},

		//Open task

		open : {
			test: {
				path: 'http://localhost:8888/_SpecRunner.html',
				delay: 1000
			}
		}

	});

	// Load the plugins tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks('grunt-open');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'jasmine', 'concat:dist', 'uglify:build']);
	grunt.registerTask('test debug', ['jasmine:pivotal', 'open:test', 'connect']);

};