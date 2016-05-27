var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('compile:sass', 'compiles scss files to css', function () {
  return gulp.src('./scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/css/app.css'))
});

gulp.task('watch:sass', 'starts a watch task on your scss files', function () {
  gulp.watch('./scss/**/*.scss', ['compile:css']);
});

gulp.task('compress:app-css', 'conditionally compresses your css files based on environment', function () {
  return gulp.src('./public/css/app.css')
      .pipe(gutil.env.NODE_ENV === 'prod' ? cssmin() : gutil.noop())
      .pipe(rename('app.min.css')).pipe('./public/css')
}, {
  options: {
    "env=dev": "set the environment 'compress:css' will run to change it's behaviour"
  }
});