const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const ts = require('./../node_modules/gulp-typescript');

gulp.task('compile-css', () => {
    return gulp.src(['../src/**/*.less', '!../src/**/_*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../diary-dist/'));
});

// gulp.task('compile-js', () => {
//     return gulp.src(['../src/**/*.js'])
//         .pipe(gulp.dest('../diary-dist/'));
// });

const tsProject = ts.createProject('../tsconfig.json');

gulp.task('compile-ts', () => {
    const tsResult = gulp.src(['../src/**/*.ts'])
                        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('../dist/'));    
});

gulp.task('compile-wxss', () => {
    return gulp.src(['../src/**/*.wxss'])
        .pipe(gulp.dest('../diary-dist/'));
});

gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json'])
        .pipe(gulp.dest('../diary-dist/'));
});

gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml'])
        .pipe(gulp.dest('../diary-dist/'));
});

gulp.task('default', ['compile-css', 'compile-ts', 'compile-json', 'compile-wxml', 'compile-wxss']);