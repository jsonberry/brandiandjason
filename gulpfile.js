// NPM Packages
const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const webpack       = require('webpack-stream');
const spawn         = require('child_process').spawn;
const notify        = require('gulp-notify');
const bower         = require('main-bower-files');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const imgmin        = require('gulp-imagemin');
const svgstore      = require('gulp-svgstore');
const inject        = require('gulp-inject');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const processors    = [ autoprefixer(), cssnano() ];

// Locations
const jsFiles       = 'src/_resources/scripts/**/*.js';
const scssFiles     = 'src/_resources/styles/**/*.scss'
const htmlFiles     = 'src/**/**/*.html';
const mdFiles       = 'src/**/**/*.md';
const bowerJsFiles  = '**/*.js';
const bowerCssFiles = '**/*.css';
const jsEntry       = 'src/_resources/scripts/app.js';
const scssEntry     = 'src/_resources/styles/main.scss';
const jsDest        = 'dist/resources/scripts';
const cssDest       = 'dist/resources/styles';

//-------------------------------------------------------------- Start Dev Server

gulp.task('default', ['browserSyncStart', 'watch']);

gulp.task('browserSyncStart', ['devBuild'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('devBuild', ['jsDevBuild', 'sassDevBuild', 'bowerDevBuild', 'imgStripMetaDataDev']);

gulp.task('watch', function () {
    gulp.watch([jsFiles], ['jsReload']);
    gulp.watch([scssFiles], ['sassStream']);
    gulp.watch([htmlFiles, mdFiles], ['jekyllReload']);
});


//-------------------------------------------------------------- JavaScript Dev Build & Stream Tasks

gulp.task('jsDevBuild', ['jekyllDevBuild'], function() {
  return gulp.src(jsEntry)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
        devtool: 'source-map',
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },
          ],
        },
      }))
      .on('error', function(err) {
          notify({title: 'JavaScript Error', message: 'Check termianl for details', icon: 'error.png'}).write(err);
          this.emit('end');
      })
    .pipe(gulp.dest(jsDest));
});

gulp.task('jsStream', function() {
  return gulp.src(jsEntry)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
        devtool: 'source-map',
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },
          ],
        },
      }))
    .on('error', function(err) {
        notify({title: 'JavaScript Error', message: 'Check termianl for details', icon: 'error.png'}).write(err);
        this.emit('end');
    })
    .pipe(gulp.dest(jsDest));
});

gulp.task('jsReload', ['jsStream'], function() {
  browserSync.reload();
});

//-------------------------------------------------------------- Sass Dev Build & Stream Tasks

gulp.task('sassDevBuild', ['jekyllDevBuild'], function () {
    return gulp.src(scssEntry)
        .pipe(sourcemaps.init())
        .pipe(sass({ errLogToConsole: false, }))
        .on('error', function(err) {
            notify({title: 'Sass Error', icon: 'error.png'}).write(err);
            this.emit('end');
        })
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDest));
});

gulp.task('sassStream', function () {
    return gulp.src(scssEntry)
        .pipe(sourcemaps.init())
        .pipe(sass({ errLogToConsole: false, }))
        .on('error', function(err) {
            notify({title: 'Sass Error', icon: 'error.png'}).write(err);
            this.emit('end');
        })
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
});


//-------------------------------------------------------------- Bower Dev Build & Stream Tasks

gulp.task('bowerDevBuild', ['bowerJSDev', 'bowerCSSDev']);

gulp.task('bowerCSSDev', ['jekyllDevBuild'], function () {
  return gulp.src(bower(bowerCssFiles))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.css'))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest));
});

gulp.task('bowerJSDev', ['jekyllDevBuild'], function () {
  return gulp.src(bower(bowerJsFiles))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(jsDest));
});

//-------------------------------------------------------------- Jekyll Tasks

gulp.task('jekyllDevBuild', function (done) {
    return spawn( 'jekyll' , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyllReload', ['devBuild'], function () {
    browserSync.reload();
});

//-------------------------------------------------------------- SVG Tasks

gulp.task('svgInject', function () {
    var svgs = gulp
        .src('src/_svg/*.svg')
        .pipe(svgstore());

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('src/_svg/svgstore.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('src/_includes/'));
});

//-------------------------------------------------------------- Image Metadata Striping

gulp.task('imgStripMetaDataDev', ['jekyllDevBuild'], function() {
    gulp.src('src/_assets_unprocessed/images/*.*')
        .pipe(imgmin())
        .pipe(gulp.dest('dist/assets/images/'));
});

//-------------------------------------------------------------- Production Build Tasks

gulp.task('build', ['jsBuild', 'sassBuild', 'bowerBuild', 'imgStripMetaData']);

gulp.task('jekyllBuild', function (done) {
    return spawn( 'jekyll' , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jsBuild', ['jekyllBuild'], function() {
  return gulp.src(jsEntry)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },
          ],
        },
      }))
    .on('error', function(err) {
        notify({title: 'JavaScript Error', message: 'Check termianl for details', icon: 'error.png'}).write(err);
        this.emit('end');
    })
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('sassBuild', ['jekyllBuild'], function () {
    return gulp.src(scssEntry)
        .pipe(sass({ errLogToConsole: false, }))
        .on('error', function(err) {
            notify({title: 'Sass Error', icon: 'error.png'}).write(err);
            this.emit('end');
        })
        .pipe(postcss(processors))
        .pipe(gulp.dest(cssDest));
});

gulp.task('bowerCSS', ['jekyllBuild'], function () {
  return gulp.src(bower(bowerCssFiles))
    .pipe(concat('vendor.min.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest(cssDest));
});

gulp.task('bowerJS', ['jekyllBuild'], function () {
  return gulp.src(bower(bowerJsFiles))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('bowerBuild', ['bowerJS', 'bowerCSS']);

gulp.task('imgStripMetaData', ['jekyllBuild'], function() {
    gulp.src('src/_assets_unprocessed/images/*.*')
        .pipe(imgmin())
        .pipe(gulp.dest('dist/assets/images/'));
});
