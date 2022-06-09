import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import fileinclude from 'gulp-file-include'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)


// Copy all html files to dist dir, fonksiyona istedğin ismi verebilirsin-> [copyHtml]
gulp.task('copyHtml', async () => {
  gulp.src('src/*.html') // Kaynak html dosyaları
    .pipe(gulp.dest('dist')) // Output folder ismi
})


// Optimize images
gulp.task('imagemin', async () => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img'))
})

// File includes
gulp.task('fileinclude', async () => {
  gulp.src(['src/views/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', async () => {
    gulp.src('src/sass/**/*.scss', { sourcemaps: true })
      .pipe(sass.sync().on('error', sass.logError)) // scss to css
      .pipe(gulp.dest('dist/assets/css', { sourcemaps: '../sourcemaps/' }))
})



gulp.task('default', async () => {
  return console.log('Gulp is running...')
}) // Üstteki gibi fonksiyon adı vermeden çalıştırmak için task ismine default yazıp konsola: gulp


// GULP WATCH
gulp.task('watch', async () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'))
  gulp.watch('src/views/*.html', gulp.series('fileinclude'))
  //gulp.watch('src/images/*', ['imagemin'])
})