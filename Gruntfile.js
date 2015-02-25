/*global module, require */


module.exports = function(grunt) {
	var srcFiles = ['Gruntfile.js', './lib/**/*.js', './test/**/*.js'];
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			src: srcFiles
		},
		watch: {
			dev: {
				files: srcFiles,
				tasks: ['jshint', 'nightwatch'],
				options: { spawn: false, reload: true }
			}
		},
		nightwatch: {
			options: {
				src_folders: './test/',
				output_folder : './reports/',
                selenium: {
                    start_process : true,
                    server_path : './node_modules/selenium-standalone/.selenium/2.44.0/server.jar',
                    cli_args : {
                        'webdriver.chrome.driver': './node_modules/selenium-standalone/.selenium/2.44.0/chromedriver',
                        'webdriver.firefox.profile':'', //uses default firefox browser
                        'webdriver.ie.driver':'' //driver only works with windows
                    }
                },
				test_settings: {
					default: {
						desiredCapabilities: { 
							browserName: 'phantomjs',
							'phantomjs.binary.path': './node_modules/phantomjs/lib/phantom/phantomjs.exe'
						}
					}
				},
				chrome: {
					desiredCapabilities: { 
						browserName: 'chrome'
					}
				},
				firefox: {
					desiredCapabilities: { 
						browserName: 'firefox'
					}
				},
				iexplorer: {
					desiredCapabilities: { 
						browserName: 'internet explorer'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nightwatch');

	grunt.registerTask('default', ['jshint', 'nightwatch:chrome', 'nightwatch:firefox']);
	grunt.registerTask('chrome', ['jshint', 'nightwatch:chrome']);
	grunt.registerTask('firefox', ['jshint', 'nightwatch:firefox']);
	grunt.registerTask('dev', ['watch']);

};