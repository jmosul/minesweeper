// REQUIRE
var autoprefixer = require( 'gulp-autoprefixer' );
var config = require( './gulpfile-config.json' );
var concat = require( 'gulp-concat' );
var gulp = require( 'gulp' );
var htmlmin = require( 'gulp-htmlmin' );
var livereload = require( 'gulp-livereload' );
var notify = require( 'gulp-notify' );
var plumber = require( 'gulp-plumber' );
var sass = require( 'gulp-sass' );
var templateCache = require( 'gulp-angular-templatecache' );
var karmaServer = require('karma').Server;

var htmlminConfig = {
  removeComments: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
  customAttrAssign: [ /\)?\]?=/ ]
};

gulp.task('build-js', ['build-templates'], function() {
  return gulp.src(config.filenames.src.js)
    .pipe(concat(config.filenames.dist.js))
    .pipe(gulp.dest(config.paths.dist.js))
    .pipe( livereload() )
    .pipe(notify({
      title: 'JS',
      message: 'Created app.js.'
    }));
});

gulp.task('build-templates', function() {
  return gulp.src(config.filenames.src.tpls)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(htmlmin(htmlminConfig))
    .pipe(templateCache(config.filenames.dist.tpls, {module: config.modules.tpls, root: config.tpls_path, standalone: true}))
    .pipe(gulp.dest(config.paths.src.js))
    .pipe(notify({
      title: 'Templates',
      message: 'Created app-tpls.js.'
    }));
});

gulp.task('build-css', function() {
  return gulp.src(config.filenames.src.sass)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
      errLogToConsole : true,
      //     'outputStyle' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer( { browsers: ['> 1%','ie 8', 'ie 9', 'Firefox > 20'] } ))
    .pipe(gulp.dest(config.paths.dist.css))
    .pipe(livereload())
    .pipe(notify({
      title: 'SASS',
      message: 'Created CSS'
    }));
});

gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task( 'watch-css', function(){
  livereload.listen({port: 35730});
  gulp.watch('src/scss/**/*.scss', ['build-css']);
})

gulp.task( 'watch-package', function(){
  livereload.listen({port: 35730});
  gulp.watch(
    [ config.filenames.src.js, config.filenames.src.tpls ],
    [ 'build-js' ]
  );
});

gulp.task( 'watch', ['watch-css', 'watch-package' ]);

gulp.task( 'default', ['build-js'] );
