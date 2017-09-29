'use strict';

// Dependencies
// ----------------------------------------------------------------------------
var
	//cache = require('gulp-cache'),										//
	//sourcemakps = require('gulp-sourcemaps'),					// Shows true error locations in pre-compiled file formats
	autoprefixer = require('gulp-autoprefixer'),				// HTML Vendor Prefixing
	cleanCSS = require('gulp-clean-css'),								// Cleans up CSS
	connect = require('gulp-connect'),									// Live Reload Server
	del = require('del'),																// Deletes Files
	gulp = require('gulp'),															// GULP
	gulps = require("gulp-series"),											// Groups & Orders exicutible actions
	htmlbeautify = require('gulp-html-beautify'),				// Cleans up HTML
	path = require('path'),															// Directory variables
	plumber = require('gulp-plumber'),									// Continues watching files after an error
	PrettyError = require('pretty-error'),			// Tidies errors in the console
	rename = require('gulp-rename'),										// Renames Files
	sass = require('gulp-sass'),												// Compiles SASS to CSS
	strip = require('gulp-strip-comments'),							// Removes comments from HTML
	util = require('gulp-util'),												// General tools, colours & error logging
	gulp = require('gulp'),															// General tools, colours & error logging
	twig = require('gulp-twig')													// Compiles .twig
	;

var pe = new PrettyError();
pe.start();


// Path Directories
// ----------------------------------------------------------------------------
var paths = {

	// DEVELOP
	sass: 							'./sass/**/*.scss',
	sass_style: 				'./sass/style.scss',
	sass_inline:				'./sass/inline.scss',
	sass_inline_dir:		'./sass/parts/_framework/**/*.scss',
	sass_dir:						'./sass/',
	html: 							'./html/**/*.html',
	html_dir:						'./html/',
	twig: 							'./twig/**/*.*',
	twig_ignore:				'!./twig/**/_*.twig',
	twig_dir:						'./twig/',

	// BUILD
	build:							'../build/**/*',
	build_dir:					'../build',
	build_css: 					'../build/*.css',
	build_cssinline: 		'./twig/**/*.css',
	build_cssinline_dir:'./twig/includes/template',
	build_html: 				'../build/*.html',
	build_image:				'../build/img/**/*.+(png|jpg|gif|svg)',

	// PUBLISH
	root: 							'../',
	setup: 							'../public_setup/**/*',
	public: 						'../../public/**/*',
	public_dir: 				'../../public',
	public_css: 				'../../public/*.css',
	public_html: 				'../../public/*.html',
	public_img: 				'../../public/img/',

	// CLEAN
	clean_dev: 					'../build/**/*.+(html|css)',
	clean_public: 			'../../public/**/*',

};




//
// Tasks
//
gulps.registerTasks({

	// Styles
		"sass" : (function(done) {
			setTimeout(function() {

				console.log(util.colors.bgBlack.magenta.bold('\nCompiling SASS...\n'))

				gulp.src(paths.sass, !paths.sass_inline, !paths.sass_inline_dir)
				.pipe(plumber())

				// SASS to CSS
				.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //compressed

				// Prefix
				.pipe(autoprefixer({
					browsers: ['last 2 versions'],
					cascade: true
				}))

				// Export
				.pipe(gulp.dest(paths.build_dir))




				done(
					console.log(util.colors.bgMagenta.white.bold('\n...SASS Compiled!\n'))
				);
			},
			2000);

		}),
		"sass_inline" : (function(done) {
			setTimeout(function() {

				console.log(util.colors.bgBlack.magenta.bold('\nCompiling Inline SASS...\n'))

				gulp.src(paths.sass_inline)
				.pipe(plumber())

				// SASS to CSS
				.pipe(sass({
					outputStyle: 'expanded'
				}).on('error', sass.logError)) //compressed

				// Prefix
				.pipe(autoprefixer({
					browsers: ['last 2 versions'],
					cascade: true
				}))

				// Export
				.pipe(gulp.dest(paths.build_cssinline_dir))

				done(
					console.log(util.colors.bgMagenta.white.bold('\n...Inline SASS Compiled!\n'))
				);
			},
			1000);

		}),
		"sass_min" : (function(done) {
			setTimeout(function() {

				console.log(util.colors.bgBlack.magenta.bold('\nCompiling Minified SASS...\n'))

				gulp.src(paths.sass)
				.pipe(plumber())

				// SASS to CSS
				.pipe(sass({
					outputStyle: 'expanded'
				}).on('error', sass.logError)) //compressed

				// Prefix
				.pipe(autoprefixer({
					browsers: ['last 2 versions'],
					cascade: true
				}))

				// Minify
				.pipe(cleanCSS({compatibility: 'ie8'})) // Running the plugin
				.pipe(rename({extname: '.min.css'}))

				// Export
				.pipe(gulp.dest(paths.build_dir))

				console.log(util.colors.yellow.bold('\nCompiling SASS...\n'))

				done(
					console.log(util.colors.bgMagenta.white.bold('\n...Minified SASS Compiled!\n'))
				);
			},
			2000);

		}),


	// Markup
		"html" : (function(done) {
			setTimeout(function() {

				console.log(util.colors.bgBlack.magenta.bold('\n Compiling HTML...\n'))

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

				.pipe(gulp.dest(paths.build_dir))

				done(
					console.log(util.colors.bgMagenta.white.bold('\n HTML Compiled!\n'))
				);
			},
			2000);
		}),
		"twig" : (function(done) {
			setTimeout(function() {

				console.log(util.colors.bgBlack.magenta.bold('\n Compiling TWIG...\n'))

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

				gulp.src([paths.twig, '!./twig/**/_*.twig'])

				// Compile
				.pipe(twig({
					data: {
						// About Website
						title: 							'Website Name',
						description: 				'Description of website here',
						brand_colour: 			'ff3817',

						// Contact
						author: 						'Client Name',
						description: 				'contact@olliejt.com',
						twitter_username: 	'TheOllieJT',

						// URL
						url: 								'..',
						baseurl: 						'',
						tags: 							'["olliejt", "olliejt website design", "olliejt design"]'
					},
					includes: [
						'./twig/layouts/**/*.twig',
						'./twig/includes/**/*.twig'
					],
					getIncludeId: function(filePath) {
						return path.relative(paths.twigdir, filePath);
					}
				}))

				// Rename
				.pipe(rename({extname: '.html'}))

				// Minify
				//.pipe(strip())
				.pipe(htmlbeautify(options))

				// Export
				.pipe(gulp.dest(paths.build_dir))

				done(
					console.log(util.colors.bgMagenta.white.bold('\n...TWIG Compiled!\n'))
				);
			},
			2500);
		}),


	// Server
		"watch" : (function(done) {
			setTimeout(function() {
				gulp.watch(paths.sass, !paths.sass_inline_dir, 	["sass", "updated"]) // on change run these command
				gulp.watch(paths.sass_inline_dir, 							["sass_inline"]) // on change run these command
				//gulp.watch(paths.build_cssinline, 							["twig", "updated"]) // on change run these command
				gulp.watch(paths.twig, 													["twig", "updated"]) // on change run these command
				//gulp.watch(paths.html, ["html", "updated"]) // on change run these command


				done(
					console.log(util.colors.bgRed.white.bold('\nWatching!\n'))
				);
			},
			500);
		}),
		"connect" : (function(done) {
			setTimeout(function() {

				connect.server({
					root: paths.build_dir,
					livereload: 'true'
				});

				done(
					console.log(util.colors.bgRed.white.bold('\nConnected!\n'))
				);

			},
			2000);
		}),
		"updated" : (function() {
			setTimeout(function() {

				gulp.src(paths.build_dir)
				.pipe(connect.reload(

					console.log(util.colors.bgBlack.red.bold('UPDATED!'))

				))

			},
			500);
		}),


	// Build
		"clean_dev" : (function(done) {
			setTimeout(function() {

				const del = require('del');
				del([paths.clean_dev, '!../build', '!../build/img', '!../build/img/**/*'], {force: true}).then(paths => {
					console.log(
						util.colors.red('\nAll development files in '), util.colors.bold.red('[/dev]'), util.colors.red('deleted!\n'), util.colors.magenta( paths.join('\n'))
					);
				});

				done();
			},
			500);
		}),
		"clean_public" : (function(done) {
			setTimeout(function() {

				const del = require('del');
				del([paths.clean_public, '!../../*.md', '!../../.git', '!../../.gitignore'], {force: true}).then(paths => {
					console.log(
						util.colors.red('\nAll files in '), util.colors.bold.red('[/public]'), util.colors.red('deleted!\n'), util.colors.magenta( paths.join('\n'))
					);
				});

				done();
			},
			500);
		}),


	// Publish
		"publish" : (function(done) {
			setTimeout(function() {

				gulp.src(paths.setup).pipe(gulp.dest(paths.public_dir));
				gulp.src(paths.build).pipe(gulp.dest(paths.public_dir));

				done(console.log(util.colors.black.bgBlue.bold('[/build] copied to [/public]') + util.colors.green('...')));

			},
			500);
		}),


}),





//
// Execute Tasks
//
gulp.task('default', function() {
	console.log(util.colors.green.bold('OllieJT Quickstart: ') + util.colors.red.bold('Learn more here ') + util.colors.blue('https://github.com/OllieJT/quickstart'))
});

// Deletes all genetated files
gulps.registerSeries("clean",
	[
		"clean_dev",
		"clean_public"
	], function() {
});

// Starts the development enviroment
gulps.registerSeries('serve',
	[
		// CLEAN
		"clean_dev",			// Delete HTML in /build

		// HTML
		"sass_inline",			// Compile Inline SASS
		"sass",							// Compile SASS
		"twig",							// Tidy HTML

		// Localhost
		"connect",					// Connect to Localhost
		"watch"							// Watch Files

	], function() {
	console.log(util.colors.green.bold('DEV MODE: ') + util.colors.white.bold('ENABLED') + util.colors.red.bold(' Watching...'))
});

// Generates all development files
gulps.registerSeries("build",
	[
		// CLEAN
		"clean_dev",			// Delete HTML in /build

		// HTML
		"twig",							// Tidy HTML

		//CSS
		"sass_inline",			// Compile Inline SASS
		"sass",									// Compile SASS
		"sass_min",							// Compile SASS

	], function() {
	console.log(util.colors.green.bold('BUILD: ') + util.colors.white.bold('COMPLETED') + util.colors.white('&') + util.colors.white.bold('COMPRESSED'))
});

// Generates and bundles all files
gulps.registerSeries('publish',
	[
		// CLEAN
		"clean_dev",				// Delete HTML in /build
		"clean_public",			// Delete HTML in /public

		// HTML
		"twig",							// Tidy HTML

		//CSS
		"sass_inline",			// Compile Inline SASS
		"sass",									// Compile SASS
		"sass_min",							// Compile SASS

		"publish",					// Copies development filesto [/public]

	], function() {
	console.log(util.colors.green.bold('PUBLISH: ') + util.colors.white.bold('COMPLETED') + util.colors.red.bold('Watching...'))
});





// Pretty Error
pe.appendStyle({
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
