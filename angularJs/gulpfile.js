var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

const tsTask =  function () {
    return gulp.src([
        'app/service/rest.module.ts',
        'app/factory/factory.module.ts', 
        'angular/**/*.ts',
        'app/**/*.ts'
    ])
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'boot.js',
        experimentalDecorators: true,
    }))
    .pipe(gulp.dest('app/'));
}

const directiveTask = function () {
    return gulp.src([
        'directive/gaetan.module.js',
        'directive/**/*.js'
    ])
       .pipe(concat('directive.js'))
       .pipe(uglify())
       .pipe(gulp.dest('app/'));
};

const cssTask = function () {
    return gulp.src(['directive/**/*.css'])
    .pipe(concat('directive.css'))
    .pipe(gulp.dest('content/'));
};

const watchTask =  function() {
    gulp.watch('app/**/*.ts', tsTask);
    gulp.watch('angular/**/*.ts', tsTask);
    gulp.watch('directive/**/*.js', directiveTask);
    gulp.watch('directive/**/*.css', cssTask);
}

gulp.task('ts', tsTask);
gulp.task('directive', directiveTask);
gulp.task('css', cssTask);
gulp.task('watch', gulp.series(tsTask,directiveTask,cssTask,watchTask));

exports.default =  gulp.series(tsTask,directiveTask,cssTask,watchTask);

