var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var pkg = require('./package.json');

var paths = {
  srcRoot: "./src",
  distRoot: "./dist",
}

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// pipes html to dist
gulp.task('html', function() {
  return gulp.src(paths.srcRoot + '/**/*.html')
    .pipe(gulp.dest(paths.distRoot))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// copies images to dist
gulp.task('images', function() {
  return gulp.src(paths.srcRoot + '/img/**/*')
    .pipe(gulp.dest(paths.distRoot + '/img'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src(paths.srcRoot + '/scss/freelancer.scss')
    .pipe(sass())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(paths.distRoot + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src(paths.srcRoot + '/css/freelancer.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.distRoot + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src(paths.srcRoot + '/js/freelancer.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.distRoot + '/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest(paths.distRoot + '/vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(paths.distRoot + '/vendor/jquery'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest(paths.distRoot + '/vendor/jquery-easing'))

  gulp.src(['node_modules/magnific-popup/dist/*'])
    .pipe(gulp.dest(paths.distRoot + '/vendor/magnific-popup'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest(paths.distRoot + '/vendor/font-awesome'))
})

// Default task
gulp.task('default', ['html', 'sass', 'minify-css', 'minify-js', 'images', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'html', 'sass', 'minify-css', 'images', 'minify-js'], function() {
  gulp.watch(paths.srcRoot + '/scss/*.scss', ['sass']);
  gulp.watch(paths.srcRoot + '/css/*.css', ['minify-css']);
  gulp.watch(paths.srcRoot + '/js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(paths.srcRoot + '/*.html', browserSync.reload);
  gulp.watch(paths.srcRoot + '/js/**/*.js', browserSync.reload);
});
