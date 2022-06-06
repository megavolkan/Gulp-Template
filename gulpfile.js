import gulp from 'gulp'
//const imagemin = require('gulp-imagemin')
import imagemin from 'gulp-imagemin'
import fileinclude from 'gulp-file-include'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

// GULP FONKSIYONLARI
// gulp.task - Define tasks
// gulp.src - Takes source files
// gulp.dest - Points to output folder
// gulp.watch - Watch files and folder for changes

// Fonksiyon başına async koymazsak hata alırız: 
// [00:10:06] The following tasks did not complete: message

gulp.task('message', async function() {
  return console.log('Gulp is running...')
}) // Çalıştırmak için konsola: gulp message


// Copy all html files to dist dir, fonksiyona istedğin ismi verebilirsin-> [copyHtml]
gulp.task('copyHtml', async () => {
  gulp.src('src/*.html') // Kaynak html dosyaları
    .pipe(gulp.dest('dist')) // Output folder ismi
})


// Optimize images
gulp.task('imagemin', async () => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

// File includes
gulp.task('fileinclude', async () => {
  gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', async () => {
    gulp.src('src/sass/*.scss', { sourcemaps: true })
      .pipe(sass.sync().on('error', sass.logError)) // scss to css
      .pipe(gulp.dest('dist/assets/css', { sourcemaps: '../sourcemaps/' }))
})



gulp.task('default', async () => {
  return console.log('Gulp is running...')
}) // Üstteki gibi fonksiyon adı vermeden çalıştırmak için task ismine default yazıp konsola: gulp

