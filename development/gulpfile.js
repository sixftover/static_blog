'use strict';
// Variables
var 	gulp = require('gulp'),
	sass = require('gulp-sass'),
	util = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	del = require('del'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
	imagemin = require('gulp-imagemin'),
	twig = require('gulp-twig'),
	rename = require('gulp-rename'),
	path = require('path'),
	PrettyError = require('pretty-error').start();


// Paths
var paths = {
	root: '../', 					// Root Directory (Export Folder)

	// Exporting
	css: '../*.css',				// CSS files
	html: '../*.html',				// HTML Files
	image: '../img/**/*',			// Image Files
	imagedir: '../img/',			// Image Directory

	//Compiling
	sass: './sass/**/*.scss',		// SASS files
	sassdir: './sass/',				// SASS Directory
	twig: './twig/**/*.twig',	 	// Twig Files
	twigdir: './twig'				// Twig Directory
};


// Styles
gulp.task('sass', function () {
	gulp.src(paths.sass)
	.pipe(plumber())
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //compressed

	// Export
	.pipe(autoprefixer('last 2 versions'))

	// Export
	.pipe(gulp.dest(paths.root))

	// Reload
	.pipe(connect.reload(
		console.log('Reloaded CSS!')
	)) // Reload Browser
});
gulp.task('prefix', () =>
	gulp.src(paths.css)
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	// Export
	.pipe(gulp.dest(paths.root))

	// Reload
	.pipe(connect.reload(
		console.log('Reloaded CSS!')
	)) // Reload Browser
);
// Dev Mode: Update and Watch
gulp.task('styles', ['sass', 'prefix'], function() {
	console.log('Styles up to date!')
});


// Markup
gulp.task('twig', function(){
	gulp.src(['./twig/*.twig'])

	// Globals
	.pipe(twig({
		data: {
			title: 'hello'
		},
		includes: [
			'./twig/layouts/*.twig',
			'./twig/includes/*.twig'
		],
		getIncludeId: function(filePath) {
			return path.relative(paths.twigdir, filePath);
		}
	}))

	// Extension
	.pipe(rename({extname: '.html'}))

	// Export
	.pipe(gulp.dest(paths.root))

	// Reload
	.pipe(connect.reload(
		console.log('Reloaded HTML!'))
	)
});


// Images
gulp.task('image', function () {
	gulp.src(paths.image)
	.pipe(imagemin())

	// Export
	.pipe(gulp.dest(paths.imagedir));
});


// Live Reload
gulp.task('connect', function() {
	connect.server({
		root: paths.root,
		livereload: 'true'
	});
});
gulp.task('watch', ['connect'], function () {
	gulp.watch(paths.sass, ['sass']) // on change run these command
	gulp.watch(paths.twig, ['twig'])
});


// Update Everything
gulp.task('compile', ['twig', 'styles', 'image'], function() {
	console.log('DONE: Twig Compiled, Sass Compiled + Images Compressed');
});
// Dev Mode: Update and Watch
gulp.task('default', ['compile', 'watch', 'connect'], function() {
	console.log('DEV MODE ENABLED: Compiled, Connected and Watching...');
});



















// Minify CSS
/*
gulp.task('minify-css', function() {
	return gulp.src(paths.css) // Selecting files
	.pipe(plumber())
	.pipe(cleanCSS({compatibility: 'ie8'})) // Running the plugin
	.pipe(gulp.dest(paths.root)) // Exporting it to a folder
});
*/
