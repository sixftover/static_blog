# Ollie's Quickstart file

Work in progress
---

###### Install all packages
```
sudo npm install
```


## Gulp Commands

###### Development Mode
```javascript
gulp dev

1. Deletes HTML, CSS & JS Files in [./dev]
2. Compiles SASS
3. Adds vendor prefixes
4. Tidies up HTML
3. Connects to localhost (URL in console)
4. Watches HTML & CSS for updates (reloads on save)
```

###### Build
```javascript
gulp build

1. Deletes HTML, CSS & JS Files in [./dev]
2. Compiles SASS
3. Adds vendor prefixes
4. Tidies up HTML
```

###### Cleanup
```javascript
gulp clean

1. Deletes HTML, CSS & JS Files in [./dev]
2. Deletes everything in [./public]
```

###### Publish
```javascript
gulp publish

1. Deletes all files in [./public]
2. Deletes HTML, CSS & JS Files in [./dev]
3. Compiles SASS
4. Adds vendor prefixes
5. Tidies up HTML
6. minifies CSS
7. Copies [/dev] to [/public]
8. Copies [/public_setup] to [/public]
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
