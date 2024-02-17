// list dependencies
import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import imagewebp from 'gulp-webp';

// create functions
// scss
function compilescss() {
  return src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('dist/'))
}

// js
function jsmin() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js'))
}

// images
function optimg() {
  return src('assets/images/*.{jpg,jpeg,png}')
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 80, progressive: true }),
      optipng({ optimizationLevel: 2 }),
      svgo({
        plugins: [
          { name: 'removeViewBox', active: true },
          { name: 'cleanupIDs', active: false },
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}
function webpimg() {
  return src('dist/images/*.{jpg,jpeg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}

// create watch tasks
function watchTask() {
  watch('app/scss/*.scss', compilescss)
  watch('src/js/*.js', jsmin)
  watch('assets/images/*.js', optimg)
  watch('dist/images/*.js', webpimg)
}

// default gulp
export default series(
  compilescss,
  jsmin,
  optimg,
  webpimg,
  watchTask
)


