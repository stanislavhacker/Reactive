module.exports = function(grunt) {

	// Project configuration.

	//files spec
	var files = [
			//Your files for your app, base index.js
			'src/index.html'
		],
		specs = [
			//Tests
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
			prod: ["Production.js", "Production.css"]
		},

		//Jasmine task

		jasmine: {
			pivotal: {
				src: files,
				options: {
					specs: specs
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
				dest: 'Production.js'
			}
		},

		//Uglify task

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'Production.js',
				dest: 'Production.js'
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
		}

	});

	// Load the plugins tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'jasmine', 'concat', 'uglify', 'css']);
	//Css task
	grunt.registerTask('css', 'Create production css', function() {
		var phantomjs = require('grunt-lib-phantomjs').init(grunt),
			errorCount = 0,
			done;

		// Create some kind of "all done" event.
		phantomjs.on('css.done', function(msg) {
			grunt.file.write('Production.css', msg);
			//noinspection JSUnresolvedFunction
			phantomjs.halt();
		});

		// Built-in error handlers.
		phantomjs.on('fail.load', function(url) {
			//noinspection JSUnresolvedFunction
			phantomjs.halt();
			grunt.warn('PhantomJS unable to load URL ' + url);
		});

		phantomjs.on('fail.timeout', function() {
			//noinspection JSUnresolvedFunction
			phantomjs.halt();
			grunt.warn('PhantomJS timed out.');
		});

		// This task is async.
		done = this.async();

		// Spawn phantomjs
		//noinspection JSUnusedGlobalSymbols
		phantomjs.spawn('lib/css.html', {
			// Additional PhantomJS options.
			options: {},
			// Complete the task when done.
			done: function(err) {
				done(err || errorCount === 0);
			}
		});

	});

};