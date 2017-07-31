var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('default', function () {
    return gulp.src(['app/childrenrepeat/childrenrepeat.module.ts','app/**/*.ts'])
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'boot.js'
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('app/**/*.ts', ['default']);
});