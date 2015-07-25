// 'use strict';
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// grunt-contrib-watchの設定(ウォッチ対象の設定)
		watch: {
			options: {
				livereload: true // 変更があればリロードするよ
			},
			html_files: {
				files: ['*.html', '**/*.css'] // ウォッチ対象として、ディレクトリ配下の*.htmlを指定
			},
			js_files:{
				files: '**/*.js'
			}
		},
		// grunt-contrib-connectの設定(Webサーバの設定)
		connect: {
			server: { // オプション未設定の為、空オブジェクト
				options:{
					hostname: '*',
					port: 9000
				}
			}
		},
		cssmin: {
			dist: {
				files: {'dest/main.css': ['css/main.css']}
			}
		},
		csslint: {
			check: {
				src: 'css/main.css'
			}
		},
		uglify: {
			dist: {
				files: {'dest/main.js': ['js/main.js']}
			}
		}
	});

	// Load tasks(grunt実行時に読み込むプラグイン)
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default tasks(grunt実行時に実行するタスク)
	grunt.registerTask('default', ['connect', 'watch']);
};

