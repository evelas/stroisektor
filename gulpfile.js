'use strict';

var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var srcmaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var bs = require('browser-sync').create();

sass.compiler = require('node-sass');


gulp.task('clean', function () {
  return del('build');
});

gulp.task('clean:html', function () {
  return del('build/*.html');
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest('build'))
    .on('end', bs.reload);
});

gulp.task('clean:fonts', function () {
  return del('build/fonts/*');
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/*')
    .pipe(plumber())
    .pipe(gulp.dest('build/fonts'))
    .on('end', bs.reload);
});

gulp.task('style', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(srcmaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.min.css'))
    .pipe(srcmaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('js', function () {
  return gulp.src(['src/js/libs/*.js', 'src/js/*.js'])
    .pipe(plumber())
    .pipe(srcmaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(srcmaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('clean:svg-sprite', function () {
  return del('build/img/svg-sprite');
});

gulp.task('svg-sprite', function () {
  return gulp.src('src/img/svg-sprite/**/*')
      // .pipe(svgmin())
      .pipe(svgstore())
      .pipe(rename('sprite-min.svg'))
      .pipe(gulp.dest('build/img/svg-sprite'))
      .pipe(bs.reload({
        stream: true
      }));
});

gulp.task('clean:svg', function () {
  return del('build/img/svg');
});

gulp.task('svg', function () {
  return gulp.src('src/img/svg/**/*')
    .pipe(gulp.dest('build/img/svg'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('clean:img', function () {
  return del('build/img');
});

gulp.task('img:dev', function () {
  return gulp.src('src/img/picture/**/*')
    .pipe(gulp.dest('build/img/picture'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('img:prod', function () {
  return gulp.src('src/img/picture/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/picture'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('serve', function () {
  bs.init({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', gulp.series(
    'clean:html',
    'html'
  ));
  gulp.watch('src/fonts/*', gulp.series(
    'clean:fonts',
    'fonts'
  ));
  gulp.watch('src/sass/**/*.scss', gulp.series('style'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/img/svg-sprite/*.svg', gulp.series(
    'clean:svg-sprite',
    'svg-sprite',
    'clean:html',
    'html'
  ));
  gulp.watch('src/img/svg/**/*', gulp.series(
    'clean:svg',
    'svg'
  ));
  gulp.watch('src/img/picture/**/*', gulp.series(
    'clean:img',
    'img:dev'
  ));
});


gulp.task('dev', gulp.series(
  'clean',
    gulp.parallel(
        'html',
        'fonts',
        'style',
        'js',
        'svg-sprite',
        'svg',
        'img:dev'
    )
));

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
      'html',
      'fonts',
      'style',
      'js',
      'svg-sprite',
      'svg',
      'img:prod'
  )
));

gulp.task('live-serve', gulp.parallel(
  'watch',
  'serve'
));
