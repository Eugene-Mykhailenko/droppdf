var gulp = require('gulp'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');
	sftp = require('gulp-sftp'),
	iconfont = require("gulp-iconfont"),
    consolidate = require("gulp-consolidate"),
    runTimestamp = Math.round(Date.now() / 1000);

//gulp.task('scripts', function() {
//	return gulp.src([
//		'./src/js/data_actions.js',
//		'!src/js/**/_*.js',
//		'./src/js/*.js',
//	])
//	.pipe(concat('main.js'))
//	.pipe(gulp.dest('build'));
//});

gulp.task('styles', function(){
	return gulp.src('src/sass/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});


gulp.task('watch', function() {
	gulp.watch('src/sass/**/*', ['styles']);
	gulp.watch('src/js/*.js', ['scripts']);
	// gulp.watch('build/*', ['upload']);
});


// gulp.task('upload', function(){
// 	gulp.src('build/*')
// 		.pipe(sftp({
// 			host: '',
// 			user: '',
// 			pass: '',
// 			remotePath: '/data/build'
// 		}))
// });


gulp.task('default', function() {
	gulp.start('styles', 'scripts');
});



// icon font
var fontname = 'theme-icons';
gulp.task('font', function(){
  return gulp.src('src/svg_icons/*.svg')
	.pipe(iconfont({
		fontName: fontname,
		prependUnicode: true,
		formats: ['ttf', 'eot', 'woff', 'woff2'],
		timestamp: runTimestamp,
		normalize: true,
		fontHeight: 1001,
		fontStyle: 'normal',
		fontWeight: 'normal'
    }))
    .on('glyphs', function(glyphs, options) {
        console.log(glyphs);
        gulp.src('src/svg_icons/helpers/_icons.sass')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: '../src/sass/icons/',
                className: 'icon'
            }))
            .pipe(gulp.dest('src/sass/icons/'));
        gulp.src('src/svg_icons/helpers/icons.html')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: '../src/sass/icons/',
                className: 'icon',
                htmlBefore: '<i class="icon ',
                htmlAfter: '"></i>',
                htmlBr: ''
            }))
            .pipe(gulp.dest('src/sass/icons/'));
    })
    .pipe(gulp.dest('src/sass/icons/'));
});


