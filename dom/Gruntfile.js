module.exports = function(grunt) {

	// Project configuration.

	//files spec
	var files = [
			//Base object
			'src/dom.js',
			'src/dom.element.js',
			//Utils
			'src/utils/utils.inherit.js',
			//Data
			'src/data/data.contract.js',
			'src/data/data.contract.unbound.js',
			//Html
			'src/html/html.element.js',
			'src/html/html.element.text.js',
			'src/html/html.attribute.js',
			'src/html/html.attribute.data.js',
			'src/html/html.classes.js',
			'src/html/html.elements.js',
			//Css
			'src/sheets/sheets.css.js',
			'src/sheets/sheets.css.property.js',
			'src/sheets/sheets.css.group.js',
			//Builders
			'src/builder/builder.live.js',
			'src/builder/builder.live.text.js'
		],
		specs = [
			'test/**/*.js'
		],
		watch = [
			'src/**/*.js',
			'test/**/*.js'
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
			}
		}
	});

	// Load the plugins tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'jasmine', 'concat', 'uglify']);

};