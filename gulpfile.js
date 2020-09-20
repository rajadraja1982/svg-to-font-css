var iconfont = require('gulp-iconfont');
var gulp = require('gulp')
var runTimestamp = Math.round(Date.now()/1000);
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'icons';

gulp.task('icon2font', function(){
  return gulp.src(['assets/icons/*.svg'])
    .pipe(iconfontCss({
        fontName: fontName,
        path: 'assets/templates/_icons_scss',
        targetPath: '../scss/_icons.scss',
        fontPath: '../fonts/'
      }))
      .pipe(iconfont({
        fontName: fontName, // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
      }))
        .on('glyphs', function(glyphs, options) {
          // CSS templating, e.g.
          console.log(glyphs, options);
        })
      .pipe(gulp.dest('assets/fonts/'));
  });