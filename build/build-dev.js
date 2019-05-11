const gulp = require('../node_modules/gulp');
const less = require('../node_modules/gulp-less');
const cssmin = require('../node_modules/gulp-clean-css');
const rename = require('../node_modules/gulp-rename');
const ts = require('./../node_modules/gulp-typescript');

gulp.task('compile-css', () => {
    return gulp.src(['../src/**/*.less', '!../src/**/_*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('compile-js', () => {
    return gulp.src(['../src/**/*.js', '!./../src/miniprogram/wux/**/*.js', './../src/miniprogram/wux/helpers//**/*.js'])
        .pipe(gulp.dest('../dist/'));
});


const tsProject = ts.createProject('../tsconfig.json');

gulp.task('compile-ts', () => {
    const tsResult = gulp.src(['../src/**/*.ts', '!../src/interface/**/*.ts'])
                        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('../dist/'));    
});

gulp.task('compile-wxss', () => {
    return gulp.src(['../src/**/*.wxss', '!./../src/miniprogram/wux/**/*.wxss'])
        .pipe(gulp.dest('../dist/'));
});

gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json', '!./../src/miniprogram/wux/**/*.json'])
        .pipe(gulp.dest('../dist/'));
});

gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml', '!./../src/miniprogram/wux/**/*.wxml'])
        .pipe(gulp.dest('../dist/'));
});

gulp.task('auto', () => {
    gulp.watch('../src/**/*.less', ['compile-css']);
    gulp.watch('../src/**/*.ts', ['compile-ts']);
    gulp.watch('../src/**/*.js', ['compile-js']);
    gulp.watch('../src/**/*.json', ['compile-json']);
    gulp.watch('../src/**/*.wxml', ['compile-wxml']);
    gulp.watch('../src/**/*.wxss', ['compile-wxss']);
});

gulp.task('default', ['compile-css', 'compile-ts', 'compile-json', 'compile-wxml', 'auto']);