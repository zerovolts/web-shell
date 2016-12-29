var gulp = require('gulp')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var webserver = require('gulp-webserver')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var stylus = require('gulp-stylus')

gulp.task('build-js', () => {
  return browserify('src/index.js')
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('build-css', () => {
  return gulp.src('src/styles/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('build/styles'))
})

gulp.task('watch', () => {
  gulp.watch('src/*.js', ['build-js'])
  gulp.watch('src/styles/*.styl', ['build-css'])
})

gulp.task('webserver', ['build-js'], () => {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
    }));
});

gulp.task('build', ['build-js', 'build-css'])
gulp.task('default', ['build', 'watch', 'webserver'])
