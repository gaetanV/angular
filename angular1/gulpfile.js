var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('ts', function () {
    return gulp.src([
        'app/service/rest.module.ts',
        'app/factory/factory.module.ts', 
        'app/**/*.ts'
    ])
           .pipe(ts({
                noImplicitAny: true,
                outFile: 'boot.js'
            }))
            .pipe(gulp.dest('app/'));
});

gulp.task('directive', function () {
    return gulp.src([
        'directive/gaetan.module.js',
        'directive/**/*.js'
    ])
       .pipe(concat('directive.js'))
       .pipe(uglify())
       .pipe(gulp.dest('app/'));
});



gulp.task('css', function () {
    return gulp.src(['directive/**/*.css'])
       .pipe(concat('directive.css'))
       .pipe(gulp.dest('content/'));
});

gulp.task('watch', ['ts','directive','css'], function () {
    gulp.watch('app/**/*.ts', ['ts']);
    gulp.watch('directive/*.js', ['directive']);
});