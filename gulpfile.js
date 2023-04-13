const { src, dest, watch, series } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const imagemin = require('gulp-imagemin');

//Javascript
const terser = require('gulp-terser-js');

function css() {
    return src(["src/scss/app.scss"])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));
}

function bootstrap() {
    return src(["node_modules/bootstrap/scss/bootstrap.scss"])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));
}

function js() {
    return src(["src/js/**/*.js"])
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
}

function bootstrapjs() {
    return src(["node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"])
        .pipe(dest('build/js'));
}

function jquery() {
    return src(["node_modules/jquery/dist/jquery.min.js"])
        .pipe(dest('build/js'));
}

function imagenes() {
    return src("src/img/*")
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest("build/img/"))
}

function dev() {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", js);
}

exports.css = css;
exports.bootstrap = bootstrap;
exports.js = js;
exports.bootstrapjs = bootstrapjs;
exports.jquery = jquery;
exports.imagenes = imagenes;
exports.dev = dev;
exports.default = series(css, bootstrap, js, bootstrapjs, jquery, imagenes, dev);