module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// ----------------------------------------------------------------------
		jshint: {
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/*.js']
			}
		},
		// ----------------------------------------------------------------------
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				stripBanners: true
			},
			src: {
				src: ['src/*.js'],
				dest: 'bin/<%= pkg.name %>.js'
			}
		},
		// ----------------------------------------------------------------------
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			src: {
				src: 'bin/<%= pkg.name %>.js',
				dest: 'bin/<%= pkg.name %>.min.js',
			}
		},
		// ----------------------------------------------------------------------
		copy: {
			main: {
				src: 'bin/<%= pkg.name %>.min.js',
				dest: '../colorful-background-website/js/<%= pkg.name %>.min.js'
			}
		},
		// ----------------------------------------------------------------------
		watch: {
			files: ['src/**/*', '!Gruntfile.js'],
			tasks: ['default'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);

};