var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('ts', function () {
    return gulp.src([
        'app/childrenrepeat/childrenrepeat.module.ts',
        'app/data/date.module.ts',
        'app/service/rest.module.ts',
        'app/finder/finder.module.ts',
        'app/quickedit/quickedit.module.ts',
        'app/getcode/getcode.module.ts', 
        'app/form/form.module.ts', 
        'app/matchfield/field.module.ts', 
        'app/ngdrag/ngdrag.module.ts', 
        'app/**/*.ts'
    ])
           .pipe(ts({
                noImplicitAny: true,
                outFile: 'boot.js'
            }))
            .pipe(gulp.dest('app/'));
});

gulp.task('directive', function () {
    return gulp.src(['directive/**/*.js'])
       .pipe(concat('directive.js'))
       .pipe(uglify())
       .pipe(gulp.dest('app/'));
});

gulp.task('watch', ['ts','directive'], function () {
    gulp.watch('app/**/*.ts', ['ts']);
    gulp.watch('directive/*.js', ['directive']);
});