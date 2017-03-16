'use strict';
// Variables
var 	gulp = require('gulp'),
	// A
	autoprefixer = require('gulp-autoprefixer'),
	// C
	cleanCSS = require('gulp-clean-css'),
	connect = require('gulp-connect'),
	// H
	htmlbeautify = require('gulp-html-beautify'),
	// I
	imagemin = require('gulp-imagemin'),
	// P
	plumber = require('gulp-plumber'),
	// R
	rename = require('gulp-rename'),
	//S
	//sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	gulps = require("gulp-series"),
	// T
	twig = require('gulp-twig'),
	// U
	util = require('gulp-util'),
	// Other
	path = require('path'),
	PrettyError = require('pretty-error').start(),
	del = require('del');

// Paths
var paths = {
	root: '../', 					// Root Directory (Export Folder)

	// Exporting
	css: '../*.css',				// CSS files
	html: '../*/*.html',				// HTML Files
	image: '../img/**/*',			// Image Files
	imagedir: '../img/',			// Image Directory

	//Compiling
	sass: './sass/**/*.scss',		// SASS files
	sassdir: './sass/',				// SASS Directory
	twig: './twig/**/*.twig',	 	// Twig Files
	twigdir: './twig'				// Twig Directory
};


// Pretty Errrs
require('pretty-error').start().appendStyle({
   // this is a simple selector to the element that says 'Error'
   'pretty-error > header > title > kind': {
      // which we can hide:
      display: 'none'
   },

   // the 'colon' after 'Error':
   'pretty-error > header > colon': {
      // we hide that too:
      display: 'none'
   },

   // our error message
   'pretty-error > header > message': {
      // let's change its color:
      color: 'bright-white',

      // we can use black, red, green, yellow, blue, magenta, cyan, white,
      // grey, bright-red, bright-green, bright-yellow, bright-blue,
      // bright-magenta, bright-cyan, and bright-white

      // we can also change the background color:
      background: 'cyan',

      // it understands paddings too!
      padding: '0 1' // top/bottom left/right
   },

   // each trace item ...
   'pretty-error > trace > item': {
      // ... can have a margin ...
      marginLeft: 2,

      // ... and a bullet character!
      bullet: '"<grey>o</grey>"'

      // Notes on bullets:
      //
      // The string inside the quotation mark gets used as the character
      // to show for the bullet point.
      //
      // You can set its color/background color using tags.
      //
      // This example sets the background color to white, and the text color
      // to cyan, the character will be a hyphen with a space character
      // on each side:
      // example: '"<bg-white><cyan> - </cyan></bg-white>"'
      //
      // Note that we should use a margin of 3, since the bullet will be
      // 3 characters long.
   },

   'pretty-error > trace > item > header > pointer > file': {color: 'bright-cyan'},
   'pretty-error > trace > item > header > pointer > colon': {color: 'cyan'},
   'pretty-error > trace > item > header > pointer > line': {color: 'bright-cyan'},
   'pretty-error > trace > item > header > what': {color: 'bright-white'},
   'pretty-error > trace > item > footer > addr': {display: 'none'}
});
// Test Console Error
gulp.task('console', function(){
	console.log(util.colors.blue('This') + ' is ' + util.colors.red('now') + util.colors.green(' working'))
});


// Styles
gulp.task('sass', function () {
	gulp.src(paths.sass)
	.pipe(plumber())
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //compressed

	// Export
	.pipe(autoprefixer('last 2 versions'))

	.pipe(connect.reload(
		console.log(util.colors.red.bold('SASS ') + util.colors.red.bold('...'))
	)) // Reload Browser

	// Export
	.pipe(gulp.dest(paths.root))
});
gulp.task('prefix', () =>
	gulp.src(paths.css)
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: true
	}))

	.pipe(connect.reload(
		console.log(util.colors.red.bold('Prefix ') + util.colors.red.bold('...'))
	)) // Reload Browser

	// Export
	.pipe(gulp.dest(paths.root))
);
gulp.task('styles', ['sass', 'prefix'], function() {
	gulp.src(paths.root)
	.pipe(connect.reload(
		console.log(
			util.colors.green('Prefixed ') + util.colors.green.bold('SASS') + util.colors.green(' + ') + util.colors.green('reloaded ') + util.colors.green.bold('CSS') + util.colors.green('!')
		)
	)) // Reload Browser
});

// Minify CSS
gulp.task('minify-css', function() {
	return gulp.src(paths.css) // Selecting files
	.pipe(plumber())
	.pipe(cleanCSS({compatibility: 'ie8'})) // Running the plugin

     .pipe(cleanCSS({debug: true}, function(details) {
 	    console.log(util.colors.white(details.name) + util.colors.white(' - Original Size = ') + util.colors.red(details.stats.originalSize));
 	    console.log(util.colors.white(details.name) + util.colors.white(' - Minified Size = ') + util.colors.green.bold(details.stats.minifiedSize));
 	    console.log(util.colors.white(details.name) + util.colors.white(' - Efficiency = ') + util.colors.yellow(details.stats.efficiency));
     }))

	.pipe(gulp.dest(paths.root)) // Exporting it to a folder

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
		console.log(util.colors.green('Compiled ') + util.colors.green.bold('TWIG') + util.colors.green('!'))
	))
});
gulp.task('htmlbeautify', function() {
  var options = {
	  "indent_size": 4,
	  "indent_char": " ",
	  "eol": "\n",
	  "indent_level": 0,
	  "indent_with_tabs": false,
	  "preserve_newlines": true,
	  "max_preserve_newlines": 10,
	  "jslint_happy": false,
	  "space_after_anon_function": false,
	  "brace_style": "collapse",
	  "keep_array_indentation": false,
	  "keep_function_indentation": false,
	  "space_before_conditional": true,
	  "break_chained_methods": false,
	  "eval_code": false,
	  "unescape_strings": false,
	  "wrap_line_length": 0,
	  "wrap_attributes": "auto",
	  "wrap_attributes_indent_size": 4,
	  "end_with_newline": false
  };
  gulp.src('./src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./public/'))
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
	gulp.watch(paths.html, ['htmlbeautify'])
});











var gulps = require("gulp-series");
	gulps.registerTasks({
		"test1" : (function(done) {
			setTimeout(function() {
				console.log("test1 is done");
				done();
			}, 1000);
		}),
		"test2" : (function() {
			console.log("test2 is done");
		})
	});

gulps.registerSeries("default2", ["test1", "test2"]);











// Update Everything
gulp.task('compile', ['twig', 'styles'], function() {
	console.log(util.colors.green.bold('DONE: ') + util.colors.white.bold('COMPILED'))
});

// Package before export
gulp.task('build', ['image', 'htmlbeautify', 'minify-css'], function() {
	console.log(util.colors.green.bold('DONE: ') + util.colors.white.bold('COMPRESSED'))
});

// Dev Mode: Update and Watch
gulp.task('default', ['compile', 'connect', 'watch'], function() {
	console.log(util.colors.green.bold('DEV MODE ENABLED: ') + util.colors.white.bold('Compiled, Connected & ') + util.colors.red.bold('Watching...'))
});
