'use strict';
// Variables
var 	gulp = require('gulp'),
	// A
	autoprefixer = require('gulp-autoprefixer'),
	// C
	cleanCSS = require('gulp-clean-css'),
	connect = require('gulp-connect'),
	//cache = require('gulp-cache'),
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
	strip = require('gulp-strip-comments'),
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
	root: '../', 							// Root Directory (Export Folder)

	// ROOT FILES
	css: '../*.css',						// CSS files
	html: '../*.html',						// HTML Files
	image: '../img/**/*.+(png|jpg|gif|svg)',	// Image Files
	imagedir: '../img/',					// Image Directory

	// FILES TO CLEAN
	clean: '../*.+(html|css)',

	// COMPILE FILES
	sass: './sass/**/*.scss',				// SASS files
	sassdir: './sass/',						// SASS Directory
	twig: './twig/**/*.twig',	 			// Twig Files
	twigdir: './twig'						// Twig Directory
};



// Tasks
var gulps = require("gulp-series");
gulps.registerTasks({

	// Styles
		"sass" : (function(done) {
			setTimeout(function() {
				gulp.src(paths.sass)
				.pipe(plumber())
				.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //compressed

				// Export
				.pipe(autoprefixer('last 2 versions'))

				// Export
				.pipe(gulp.dest(paths.root))

				console.log(util.colors.red.bold('SASS ') + util.colors.red.bold('...'))

				done();
			}, 1000);

		}),
		"prefix" : (function(done) {
			setTimeout(function() {
				gulp.src(paths.css)
				.pipe(autoprefixer({
					browsers: ['last 2 versions'],
					cascade: true
				}))

				// Export
				.pipe(gulp.dest(paths.root))

				console.log(util.colors.red.bold('PREFIX ') + util.colors.red.bold('...'))

				done();
			}, 1000);
		}),
		"minify-css" : (function(done) {
			setTimeout(function() {
				return gulp.src(paths.css) // Selecting files
				.pipe(plumber())
				.pipe(cleanCSS({compatibility: 'ie8'})) // Running the plugin

			     .pipe(cleanCSS({debug: true}, function(details) {
			 	    console.log(util.colors.white(details.name) + util.colors.white(' - Original Size = ') + util.colors.red(details.stats.originalSize));
			 	    console.log(util.colors.white(details.name) + util.colors.white(' - Minified Size = ') + util.colors.green.bold(details.stats.minifiedSize));
			 	    console.log(util.colors.white(details.name) + util.colors.white(' - Efficiency = ') + util.colors.yellow(details.stats.efficiency));
			     }))

				.pipe(gulp.dest(paths.root)) // Exporting it to a folder

				console.log(util.colors.red.bold('Minified ') + util.colors.red.bold('...'))

				done();
			}, 1000);
		}),

	// Markup
		"twig" : (function(done) {
			setTimeout(function() {
				gulp.src(['./twig/*.twig'])
				.pipe(twig({
					data: {
						title: 'hello'
					},
					includes: [
						'./twig/layouts/*.twig',
						'./twig/includes/*.twig',
						'./twig/includes/**/*.twig',
						'./twig/includes/template/*.twig'
					],
					getIncludeId: function(filePath) {
						return path.relative(paths.twigdir, filePath);
					}
				}))

				// Extension
				.pipe(rename({extname: '.html'}))

				// Export
				.pipe(gulp.dest(paths.root))

				console.log(util.colors.red.bold('TWIG ') + util.colors.red.bold('...'))

				done();
			}, 1000);

		}),
		"htmlbeautify" : (function(done) {
			setTimeout(function() {
				var options = {
					"indent_size": 1,
					"indent_char": "	",
					"eol": "\n",
					"indent_level": 0,
					"indent_with_tabs": true,
					"preserve_newlines": false,
					"max_preserve_newlines": 10,

					"jslint_happy": true,

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
					"wrap_attributes_indent_size": 2,
					"end_with_newline": false
				};
				gulp.src(paths.html)
				.pipe(strip())

				.pipe(htmlbeautify(options))

				.pipe(gulp.dest(paths.root))

				console.log(util.colors.red.bold('HTML Beautify ') + util.colors.red.bold('...'))

				done();
			}, 1000);
		}),

	// Server
		"watch" : (function(done) {
			setTimeout(function() {
				gulp.watch(paths.sass, ["sass", "updated"]) // on change run these command
				gulp.watch(paths.twig, ["twig", "htmlbeautify", "updated"])
				//gulp.watch(paths.html, ["twig", "htmlbeautify", "updated"])


				done(
					console.log(util.colors.green.bold('CONNECTED...') + util.colors.green('...'))
				);
			}, 1000);
		}),
		"connect" : (function(done) {
			setTimeout(function() {

				connect.server({
					root: paths.root,
					livereload: 'true'
				});

				done();
			}, 1000);
		}),
		"updated" : (function() {
			setTimeout(function() {

				gulp.src(paths.root)
				.pipe(connect.reload(
					console.log(util.colors.green.bold('UPDATED!'))
				)) // Reload Browser

			}, 1500);
		}),

		// Build
		"image" : (function(done) {
			setTimeout(function() {
				gulp.src(paths.image)
				.pipe(imagemin())

				// Export
				.pipe(gulp.dest(paths.imagedir));
				done();
			}, 1000);
		}),
		"clean" : (function(done) {
			setTimeout(function() {

				const del = require('del');
				del(['../*.+(html|css)'], {force: true}).then(paths => {
					console.log(
						util.colors.bold.red('Files and folders deleted:\n'), util.colors.red( paths.join('\n'))
					);
				});

				done();
			}, 1000);
		}),

}),


// CSS
gulps.registerSeries("styles", ["clean", "sass", "prefix"], function() {
	console.log(util.colors.green.bold('DONE: ') + util.colors.white.bold('COMPILED SASS'))
});
// HTML
gulps.registerSeries("markup", ["clean", "twig", "htmlbeautify"], function() {
	console.log(util.colors.green.bold('DONE: ') + util.colors.white.bold('COMPILED TWIG'))
});
// HTML & CSS
gulps.registerSeries("compile", ["clean", "sass", "prefix", "twig", "htmlbeautify"], function() {
	console.log(util.colors.green.bold('DONE: ') + util.colors.white.bold('COMPILED TWIG & SASS'))
});


// Build
gulps.registerSeries("build", ["clean", "sass", "prefix", "twig", "htmlbeautify", "minify-css", "image"], function() {
	console.log(util.colors.green.bold('DONE: ') + util.colors.white.bold('COMPILED') + util.colors.white('&') + util.colors.white.bold('COMPRESSED'))
});


// Dev Mode: Update and Watch
gulps.registerSeries('default', ["clean", "sass", "prefix", "twig", "htmlbeautify", "connect", "watch"], function() {
	console.log(util.colors.green.bold('DEV MODE ENABLED: ') + util.colors.white.bold('Compiled, Connected & ') + util.colors.red.bold('Watching...'))
});


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
