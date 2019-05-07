const gulp = require('../node_modules/gulp');
const less = require('../node_modules/gulp-less');
const cssmin = require('../node_modules/gulp-clean-css');
const rename = require('../node_modules/gulp-rename');

gulp.task('compile-css', () => {
    return gulp.src(['../src/**/*.less', '!../src/**/_*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../examples/'));
});

gulp.task('compile-js', () => {
    return gulp.src(['../src/**/*.js'])
        .pipe(gulp.dest('../examples/'));
});

gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json'])
        .pipe(gulp.dest('../examples/'));
});

gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml'])
        .pipe(gulp.dest('../examples/'));
});

gulp.task('auto', () => {
    gulp.watch('../src/**/*.less', ['compile-css']);
    gulp.watch('../src/**/*.js', ['compile-js']);
    gulp.watch('../src/**/*.json', ['compile-json']);
    gulp.watch('../src/**/*.wxml', ['compile-wxml']);
});

gulp.task('default', ['compile-css', 'compile-js', 'compile-json', 'compile-wxml', 'auto']);