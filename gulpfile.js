'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const _jasmine = require('gulp-jasmine');
const JasmineConsoleReporter = require('jasmine-console-reporter');
const istanbul = require('gulp-istanbul');
const runSequence = require('run-sequence');
const tap = require('gulp-tap');

const source = ['./src/**/*.js', './index.js'];
const sample = ['./sample/**/*.js'];
const tests = ['./spec/**/*.js'];
const gulpfile = ['./gulpfile.js'];
const all = [].concat(source).concat(sample).concat(tests).concat(gulpfile);

const jasmineConfig = {
  'spec_dir': 'spec',
  'spec_files': ['**/*[sS]pec.js']
};

const WATCH_VERBOSITY = 1;
const TEST_VERBOSITY = 4;

let verbosity = TEST_VERBOSITY;

gulp.task('setup-istanbul', () => {
  return gulp.src(source)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('require-all', ['setup-istanbul'], () => {
  return gulp.src(source)
    .pipe(tap((f) => require(f.path)));
});

gulp.task('test', ['require-all'], () => {
  console.log('testing...');
  return gulp.src(tests)
    .pipe(_jasmine({
      config: jasmineConfig,
      reporter: new JasmineConsoleReporter({
        verbosity: verbosity
      }),
      includeStackTrace: true
    }))
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['text', 'text-summary', 'lcov'],
    }));
});

gulp.task('lint', () => {
  return gulp.src(all)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lite', () => {
  verbosity = WATCH_VERBOSITY;
  runSequence('lint', 'test');
});

gulp.task('default', () => {
  runSequence('lint', 'test');
});
