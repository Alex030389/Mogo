var syntax        = 'scss'; // Syntax: sass or scss;

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    del           = require('del'),
    sourcemaps    = require('gulp-sourcemaps'),
    babel         = require("gulp-babel");

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  })
});

gulp.task('clean', function () {
  return del(['dist/css', 'dist/js']);
});

gulp.task('html', function() {
  return gulp.src('dist/*.html')
  .pipe(browserSync.stream())
});

gulp.task('styles', function() {
  return gulp.src('src/'+syntax+'/**/*.'+syntax+'')
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
  .pipe(rename({ suffix: '.min', prefix : '' }))
  .pipe(autoprefixer(['last 15 versions']))
  .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream())
});

gulp.task('scripts', function() {
  return gulp.src([
    'src/js/common.js'
    ])
  .pipe(sourcemaps.init())
  .pipe(concat('scripts.min.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  // .pipe(uglify()) // Mifify js (opt.)
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
  gulp.watch('dist/*.html', gulp.parallel('html'));
  gulp.watch('src/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
  // gulp.watch(['libs/**/*.js', 'src/js/**/*'], gulp.parallel('scripts'));
  gulp.watch('src/js/**/*', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel(
  'clean',
  'styles',
  'scripts',
  'browser-sync',
  'watch'));
