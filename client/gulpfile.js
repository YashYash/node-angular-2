var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  csslint = require('gulp-csslint'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  prefix = require('gulp-autoprefixer'),
  ts = require('gulp-typescript'),
  config = require('../client/config')
  tsProject = ts.createProject('tsconfig.json');


/**
 * Compile typescript to js
 */
gulp.task('scripts', function() {
  console.log("#### Compiling typescript to javascript - tsconfig.json");
  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

	return tsResult.js.pipe(gulp.dest('build'))
});

/**
 * Lint Home app css
 */
gulp.task('cssLint:home', function() {
  console.log("#### Lint css - Home app");
  var path = "home/styles/**.css";
  gulp.src(path)
    .pipe(csslint())
    .pipe(csslint.reporter());
});

/**
 * Concatinate Home app css
 */
gulp.task('styles:home', function() {
  console.log("#### Concat css - Home app");
  var path = "home/styles/**.css";
  var cssDest = "build/home/styles";
  var cssFileName = "home-app.min.css";

  gulp.src(path)
    .pipe(plumber())
    .pipe(concat(cssFileName))
    .pipe(minifyCss())
    .pipe(prefix('last 3 versions'))
    .pipe(gulp.dest(cssDest))
    .pipe(livereload());
});

/**
 *	Start the server
 */
gulp.task('start', function() {
  console.log("#### Start the server");
  var src = '../start.js';
  nodemon({
    script: src,
    ext: "js html"
  }).on('restart', function() {
    gulp.src(src)
      .pipe(livereload())
  })
});


/**
 *	Watch server and client files change
 */
gulp.task('watch', function() {

  console.log('#### Watching file changes');
  livereload.listen();

  // server
  gulp.watch('../server/app.js', ['scripts']);
  gulp.watch('../server/start.js', ['scripts']);
  gulp.watch('../server/routes/*.js', ['scripts']);
  gulp.watch('../server/api/*.js', ['scripts']);

  // client
  gulp.watch("home/styles/*.css", ['cssLint:home', 'styles:home']);
  gulp.watch("home/scripts/**.ts", ['scripts']);
  gulp.watch("home/templates/**", ['styles:home']);

});

/**
 * The script that starts it all
 */
gulp.task('server', function() {
  gulp.start([
  	'watch',
    'cssLint:home',
    'styles:home',
    'scripts',
    'start'
  ]);
});
