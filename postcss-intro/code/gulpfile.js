var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  cssnext = require("gulp-cssnext"),
  nano = require('gulp-cssnano'),
  mqpacker = require('css-mqpacker'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch');

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 10 versions']}),
    mqpacker,
  ];
  return gulp.src('./src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cssnext({
        compress: false
    }))
    .pipe(postcss(processors))
    // .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function() {
  gulp.watch([
    './src/css/**/*.css'
  ], ['css']);
});

gulp.task('default', [
  'watch'
]);