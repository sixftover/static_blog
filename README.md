# Ollie's Quickstart file

All rights reserved.

---

## NPM Requires
+ [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
	// Adds browser vendor prefixes for CSS
+ [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
	// Minifies CSS
+ [gulp-connect](https://www.npmjs.com/package/gulp-connect)
	// Live preview of code in browser
+ [gulp-html-beautify](https://www.npmjs.com/package/gulp-html-beautify)
	// Tidies up HTML markup
+ [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
	// Compresses images
+ [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
	// Prevents gulp tasks from crashing when there are errors
+ [gulp-rename](https://www.npmjs.com/package/gulp-rename)
	// Rename files and extensions
+ [gulp-sass](https://www.npmjs.com/package/gulp-sass)
	// Compiles SASS to CSS
+ [gulp-series](https://www.npmjs.com/package/gulp-series)
	// Ensures Gulp executes tasks in order
+ [gulp-twig](https://www.npmjs.com/package/gulp-twig)
	// Compiles TWIG to HTML
+ [gulp-util](https://www.npmjs.com/package/gulp-util)
	// ?
+ [pretty-error](https://www.npmjs.com/package/pretty-error)
	// Makes console errors easier to read
+ [npm-gui](https://www.npmjs.com/package/npm-gui)
	// Might remove this - an easier way to update/manage dependencies
+ [path](https://www.npmjs.com/package/path)
	// ?
+ [del](https://www.npmjs.com/package/del)
	// ?

###### Install all packages
```
sudo npm install
```


## Gulp Commands

###### Development Mode
```javascript
gulp

1. Compiles TWIG & SASS
2. Adds vendor prefixes
3. Connects to localhost (URL shown in console)
4. Watches files for updates - reloads on save
```

###### Compile Code
```javascript
gulp styles

1. Compiles SASS to CSS
2. Adds vendor prefixes
```

```javascript
gulp markup

1. Compiles TWIG to HTML
2. Tidies up HTML markup
```

```javascript
gulp compile

1. Runs *gulp styles* and *gulp markup*
```

###### Package Website
```javascript
gulp build

1. Runs *gulp compile*
2. Minifies CSS
3. Compresses Images
```
---

## Grid System
This is a 12 column Grid System. The documentation for my grid needs work, I will be adding to it in the future.
```html
<div class="row"></div>
```
Rows contain columns. Their maximum width is defined in your SASS variables.
```html
<div class="row">
	<div class="col c12"></div>
</div>
```
Columns sit inside rows. You must add the class of column and the class defining how many columns wide it is.
```html
<div class="row">
	<div class="col c8"></div>
	<div class="col c4"></div>
</div>
```
```html
<div class="row">
	<div class="col c3"></div>
	<div class="col c3"></div>
	<div class="col c3"></div>
	<div class="col c3"></div>
</div>
```
```html
<div class="row">
	<div class="col c4"></div>
	<div class="col c2"></div>
	<div class="col c6"></div>
</div>
```
The columns in a row should always add up to twelve, no more and no less.
