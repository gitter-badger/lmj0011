// require('dotenv').load()
const gulp = require('gulp')
const rename = require('gulp-rename')

const paths = {
  srcPath: './src',
  jsPath: './src/js',
  distPath: './dist'
}

gulp.task('index-html', function() {
  return gulp.src(`${paths.srcPath}/index.html`)
    .pipe(gulp.dest(`${paths.distPath}`))
})


gulp.task('vibrant-client-build', [
  'index-html'
])

gulp.task('watch', function() {
  gulp.watch(`${paths.srcPath}/**/*`, ['vibrant-client-build'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })
});

gulp.task('default', [
  'vibrant-client-build'
])
