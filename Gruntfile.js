module.exports = function (grunt) {

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
				banner: '/*! <%= pkg.name %> | build at <%= grunt.template.today("yyyy-mm-dd") %> */\n\n' +
					'/*! \n' +
					'The MIT License (MIT) \n' +
					' \n' +
					'Copyright (c) 2014 webcore-it \n' +
					' \n' +
					'Permission is hereby granted, free of charge, to any person obtaining a copy \n' +
					'of this software and associated documentation files (the "Software"), to deal \n' +
					'in the Software without restriction, including without limitation the rights \n' +
					'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell \n' +
					'copies of the Software, and to permit persons to whom the Software is \n' +
					'furnished to do so, subject to the following conditions: \n' +
					' \n' +
					'The above copyright notice and this permission notice shall be included in all \n' +
					'copies or substantial portions of the Software. \n' +
					' \n' +
					'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR \n' +
					'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, \n' +
					'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE \n' +
					'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n' +
					'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, \n' +
					'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE \n' +
					'SOFTWARE. \n' +
					'*/ \n\n',

				stripBanners: true
			},
			src: {
				src: ['src/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		// ----------------------------------------------------------------------
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> | build at <%= grunt.template.today("yyyy-mm-dd") %> */\n\n' +
					'/*! \n' +
					'The MIT License (MIT) \n' +
					' \n' +
					'Copyright (c) 2014 webcore-it \n' +
					' \n' +
					'Permission is hereby granted, free of charge, to any person obtaining a copy \n' +
					'of this software and associated documentation files (the "Software"), to deal \n' +
					'in the Software without restriction, including without limitation the rights \n' +
					'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell \n' +
					'copies of the Software, and to permit persons to whom the Software is \n' +
					'furnished to do so, subject to the following conditions: \n' +
					' \n' +
					'The above copyright notice and this permission notice shall be included in all \n' +
					'copies or substantial portions of the Software. \n' +
					' \n' +
					'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR \n' +
					'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, \n' +
					'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE \n' +
					'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n' +
					'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, \n' +
					'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE \n' +
					'SOFTWARE. \n' +
					'*/ \n\n',

				stripBanners: true
			},
			src: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js',
			}
		},
		// ----------------------------------------------------------------------
		copy: {
			main: {
				src: 'dist/<%= pkg.name %>.min.js',
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