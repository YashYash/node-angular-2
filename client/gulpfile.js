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


gulp.task('scripts', function() {
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(ts(tsProject));
    
    return tsResult.js.pipe(gulp.dest('build'));
});


gulp.task('start', function() {
  nodemon({
    script: '../start.js'
  })
});

gulp.task('server', function() {
	console.log("#### Serving up the first app");
	gulp.start(['scripts', 'start']);
})