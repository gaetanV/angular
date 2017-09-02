var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('ts', function () {
    return gulp.src([
        'app/service/rest.module.ts',
        'app/component/childrenrepeat/childrenrepeat.module.ts',
        'app/component/data/date.module.ts',
        'app/component/finder/finder.module.ts',
        'app/component/quickedit/quickedit.module.ts',
        'app/component/getcode/getcode.module.ts', 
        'app/component/form/form.module.ts', 
        'app/component/matchfield/field.module.ts', 
        'app/component/ngdrag/ngdrag.module.ts', 
        'app/component/dropfiles/dropfiles.module.ts', 
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