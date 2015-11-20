
  var gulp      = require('gulp');
  var sass      = require('gulp-sass');
  var minifycss = require('gulp-minify-css');
  var uglify    = require('gulp-uglify');
  var concat    = require('gulp-concat');
  var watch     = require('gulp-watch');
  var header    = require('gulp-header');
  var package   = require('./package.json');

  var banner = ["/*",
    "Theme Name: <%= package.name %> v<%= package.version %>",
    "Theme URI: <%= package.repository.url %>",
    "Description: <%= package.description %>",
    "Version: <%= package.version %>",
    "Author: <%= package.author.name %>",
    "Author URI: <%= package.author.url %>",
    "License: <%= package.license %>",
  "*/"];

  var paths = {
    src : {
      sass : './src/scss/**/*.scss',
      js   : './src/js/**/*.js',
    },
    dist : {
      css : './dist/',
      js  : './dist/',
    }
  };

  gulp.task('css', () => {
    return gulp.src(paths.src.sass)
      .pipe(sass())
      .pipe(minifycss())
      .pipe(header(banner.join("\n")+"\n", { package : package }))
      .pipe(gulp.dest(paths.dist.css));
  });

  gulp.task('js', () => {
    return gulp.src(paths.src.js)
      .pipe(concat('production.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.dist.js));
  });

  gulp.task('watch', () => {
    watch(paths.src.sass, () => { gulp.start('css'); });
    watch(paths.src.js, () => { gulp.start('js'); });
  });

  gulp.task('default', ['css', 'js', 'watch']);
