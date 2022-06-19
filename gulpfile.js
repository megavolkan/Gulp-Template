import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import fileinclude from 'gulp-file-include'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import browserSync from 'browser-sync';
const server = browserSync.create();

const paths = {
  styles: {
    src: 'src/sass/**/*.sass',
    dest: 'dist/assets/css'
  },
  scripts: {
    src: 'src/scripts/*.js',
    dest: 'dist/scripts/'
  },
  views: {
    src: 'src/views/**/*.html',
    dest: 'dist/'
  },
};

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
  gulp.src([paths.views.src,'!src/views/**/_*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', async () => {
  gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sass.sync().on('error', sass.logError)) // scss to css
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: '../sourcemaps/' }))
})

// Browser Sync
function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
}


gulp.task('test', async () => {
  return console.log('Gulp is running...')
}) // Üstteki gibi fonksiyon adı vermeden çalıştırmak için task ismine default yazıp konsola: gulp

const compileSass = () => gulp.watch(paths.styles.src, gulp.series(sass, reload));
const compileViews = () => gulp.watch(paths.views.src, gulp.series(fileinclude, reload));

const dev = gulp.series(compileSass, compileViews, serve);

export default dev;

// GULP WATCH
gulp.task('watch', async () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'))
  gulp.watch('src/views/**/*.html', gulp.series('fileinclude'))
  //gulp.watch('src/images/*', ['imagemin'])
})