var gulp = require('gulp');
var ts = require('gulp-typescript')

gulp.task('copy', () => {
})

function copy(cb) {
  gulp.src(['./functions/**/*', '!./functions/**/*.ts'])
    .pipe(gulp.dest('dist/functions'))
  cb()
}

function compile(cb) {
  gulp.src('./functions/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      outDir: 'dist/functions/'
      // outFile: 'dist/functions/output.js'
    }))
    .pipe(gulp.dest('dist/functions'))
    cb()
}

exports.default = gulp.series(
  copy, compile
)

// module.exports = gulp.series(
// )
