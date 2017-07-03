'use strict';

const gulp    = require('gulp');
const plugins = require('gulp-load-plugins')();
plugins.runSequence = require('run-sequence');

const paths = {
  dist: './dist',
  sass: {
    entry:  './src/scss/main.scss',
    output: './dist/css',
    watch: './src/scss/**/*.scss'
  },
  js: {
    vendor: {
      entry: ['./components/**/*.min.js', '!**/ocLazyLoad.require.min.js'],
      output: './dist',
      bundle: 'vendor.js'
    },
    app: {
      entry: ['./src/app/app.module.js','./src/app/app.config.js'],
      output: './dist/app',
      bundle: 'app.bundle.js'
    },
    modules: {
      entry: ['./src/app/**/*.js', '!./src/app/*.js'],
      output: './dist/app'
    }
  },
  html: {
    entry: ['./src/**/*.html'],
    output: './dist'
  }
}

const onSourcemaps = process.env.NODE_ENV != "production";

/*
 * SASS TASK
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass.entry)
  .pipe(plugins.if(onSourcemaps, plugins.sourcemaps.init()))
  .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(gulp.dest(paths.sass.output));
});

gulp.task('sass:watch', function () {
  plugins.watch(paths.sass.watch, function() {
    gulp.start('sass');
  });
});

/*
 * Clean Task
 */
 gulp.task('clean', function () {
  return gulp.src(paths.dist, {read: false})
    .pipe(plugins.clean());
});

/*
 * Copy Components JS Task
 */
 gulp.task('vendor-js', function () {
  return gulp.src(paths.js.vendor.entry)
    .pipe(plugins.concat(paths.js.vendor.bundle))
    .pipe(gulp.dest(paths.js.vendor.output));
});

/*
 * Copy App JS Task
 */
 gulp.task('app-js', function () {
  return gulp.src(paths.js.app.entry)
    .pipe(plugins.concat(paths.js.app.bundle))
    .pipe(gulp.dest(paths.js.app.output));
});

gulp.task('app-js:watch', function () {
  plugins.watch(paths.js.app.entry, function() {
    gulp.start('app-js');
  });
});

/*
 * Copy Modules JS Task
 */
 gulp.task('modules-js', function () {
  return gulp.src(paths.js.modules.entry)
    .pipe(gulp.dest(paths.js.modules.output));
});

gulp.task('modules-js:watch', function () {
  plugins.watch(paths.js.modules.entry, function() {
    gulp.start('modules-js');
  });
});

/*
 * Copy HTML Task
 */
gulp.task('html-copy', function () {
  return gulp.src(paths.html.entry)
      .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest(paths.html.output));
});
gulp.task('html-copy:watch', function () {
  plugins.watch(paths.html.entry, function() {
    gulp.start('html-copy');
  });
});

gulp.task('watch', [
    'sass:watch',
    'app-js:watch',
    'modules-js:watch',
    'html-copy:watch'
]);

let tasks = [
  'sass',
  'vendor-js',
  'app-js',
  'modules-js',
  'html-copy',
];

gulp.task('dev', function () {
  plugins.runSequence('clean', tasks.concat('watch'));
});

gulp.task('default', function () {
  plugins.runSequence('clean', tasks);
});
