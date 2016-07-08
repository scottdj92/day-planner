var gulp = require('gulp');

gulp.task('default', function() {
    //default task
});


//SASS
gulp.task('sass', function() {
    return gulp.src('./app/**/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});
