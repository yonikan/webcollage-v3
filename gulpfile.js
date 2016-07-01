
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var gutil = require('gulp-util');


// ... variables ----
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
	browsers: ['last 2 versions'],
	cascade: false
};
var ejsOptions = {
  msg: 'works fine!'
}

// ... tasks ----
gulp.task('serve', ['sass', 'ejs', 'js'], function() {
    browserSync.init({
        server: "./"
    });
    // gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('./ejs/**/*.ejs', ['ejs']);
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch("./js/*.js", ['js']);
});

gulp.task('ejs', function() {
    return gulp.src("./ejs/index.ejs")
      .pipe(ejs(ejsOptions).on('error', gutil.log))
      .pipe(rename('index.html'))
      .pipe(gulp.dest("./"))
      .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./sass/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(sourcemaps.write('./others'))
      .pipe(gulp.dest("./dist"))
      .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
