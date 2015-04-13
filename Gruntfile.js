module.exports = function(grunt) {

	var sandbox = "sandbox/lib/",
		bundle = [
			'dom/dist/Reactive.js',
			'css/dist/Reactive.css.js'
		];

	//noinspection JSUnresolvedFunction
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Concat task

		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: bundle,
				// the location of the resulting JS file
				dest: sandbox + 'Reactive.min.js'
			}
		},

		//Uglify task

		uglify: {
			options: {
				banner: '/*! Reactive <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: sandbox + 'Reactive.min.js',
				dest: sandbox + 'Reactive.min.js'
			}
		},

		//Compress task

		compress: {
			main: {
				options: {
					archive: 'Reactive-sandbox.zip'
				},
				files: [
					{expand: true, cwd: 'sandbox/', src: ['*.*']},
					{expand: true, cwd: 'sandbox/', src: ['lib/**/*']},
					{expand: true, cwd: 'sandbox/', src: ['src/**/*']},
					{expand: true, cwd: 'sandbox/', src: ['test/**/*']}
				]
			}
		}

	});

	// Load the plugins tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compress');

	/**
	 * Spawn grunt for module
	 * @param {string} module
	 * @param {Array.<string>} tasks
	 * @param {function} done
	 */
	function spawnGrunt(module, tasks, done) {
		grunt.util.spawn({
			grunt: true,
			args: tasks,
			opts: {
				cwd: module
			}
		}, function(error, result, code) {
			console.log(result.stdout);
			done();
		})
	}

	grunt.registerTask('create bundle', function() {
		var cb = this.async();

		spawnGrunt('dom', ['default'], function () {
			spawnGrunt('css', ['default'], function() {
				grunt.task.run(['concat', 'uglify', 'compress']);
				cb();
			});
		});
	});

};
