// 'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssmin      = require('gulp-clean-css'),
    plumber     = require('gulp-plumber'),
	notify      = require('gulp-notify'),
    del         = require('del'),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload;

var path = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        imgAll: 'dist/img/all',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: [
            './node_modules/jquery/dist/jquery.min.js',
            "./node_modules/slick-carousel/slick/slick.min.js",
            './src/js/main.js'
        ],
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: 'dist'
};

var config = {
    server: {
        baseDir: 'dist'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Ok"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function () {
    del(path.clean);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);

// browser-sync
// gulp
// gulp-autoprefixer
// gulp-clean-css
// gulp-concat
// gulp-sass
// gulp-sourcemaps
// gulp-uglify
// gulp-watch
// del
// gulp-notify(выводит ошибки)
// gulp-plumber

// ===============================
// gulp-concat(заменили на gulp-rigger)
// gulp-rename(добавляет .min)
// css-comb - уснановить вместо расширения
// из папки img при билде исключить папку all!!!