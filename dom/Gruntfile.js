module.exports = function(grunt) {

	// Project configuration.

	//files spec
	var files = [
			//Base object
			'src/dom.js',
			'src/dom.element.js',
			//Renderer
			'src/render/render.renderer.js',
			'src/render/render.queue.js',
			'src/render/render.update.js',
			//Utils
			'src/utils/utils.inherit.js',
			'src/utils/utils.logger.js',
			'src/utils/utils.array.js',
			//Events
			'src/events/events.event.js',
			'src/events/events.event.message.js',
			'src/events/events.event.change.js',
			'src/events/events.event.mouse.js',
			'src/events/events.event.scroll.js',
			'src/events/events.event.key.js',
			'src/events/events.event.form.js',
			//Data
			'src/data/data.contract.js',
			'src/data/data.contract.unbound.js',
			//Html
			'src/html/html.element.js',
			'src/html/html.element.text.js',
			'src/html/html.element.root.js',
			'src/html/html.attribute.js',
			'src/html/html.attribute.data.js',
			'src/html/html.classes.js',
			'src/html/html.elements.js',
			//Css
			'src/sheets/sheets.css.js',
			'src/sheets/sheets.css.property.js',
			'src/sheets/sheets.css.group.js',
			'src/sheets/sheets.css.rule.js',
			'src/sheets/sheets.css.rules.js',
			//Builders
			'src/builder/builder.live.js',
			'src/builder/builder.live.text.js',
			'src/builder/builder.event.js',
			'src/builder/builder.css.js'
		],
		specs = [
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
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-open');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'jasmine', 'concat', 'uglify']);
	grunt.registerTask('test debug', ['jasmine:pivotal', 'open:test', 'connect']);

};