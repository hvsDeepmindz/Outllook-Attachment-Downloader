// const gulp = require('gulp');
// const stripDebug = require('gulp-strip-debug');

// gulp.task('strip-debug', () =>
//   gulp.src('build/**/*.js') // input file path
//     .pipe(stripDebug()) // execute gulp-strip-debug
//     .pipe(gulp.dest('./build')) // output file path 
// );

const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('remove-console-logs', () => {
  return gulp.src('build/**/*.js') // Specify the path to your build files
    .pipe(replace(/console\.log\(.+?\);?/g, '')) // Regular expression to match console.log statements
    .pipe(gulp.dest('build')); // Output directory for modified files (overwrite the original files)
});

gulp.task('default', gulp.series('remove-console-logs'));
