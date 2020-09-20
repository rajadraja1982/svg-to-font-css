var iconfont = require('gulp-iconfont');
var gulp = require('gulp');
var consolidate = require('gulp-consolidate');
var async = require('async');
var rename = require('gulp-rename');

gulp.task('icon2font', function (done) {
  var iconStream = gulp.src(['assets/icons/*.svg']).pipe(iconfont({ fontName: 'icons' }));
  async.parallel(
    [
      function handleGlyphs(cb) {
        iconStream.on('glyphs', function (glyphs, options) {
          console.log(glyphs, options);
          gulp
            .src('assets/templates/_icons_scss')
            .pipe(
              consolidate('lodash', {
                glyphs: glyphs,
                fontName: 'icons',
                fontPath: '../fonts/',
                className: 'icon',
              })
            )
            .pipe(rename('_icons.scss'))
            .pipe(gulp.dest('assets/scss'))
            .on('finish', cb);
        });
      },
      function handleFonts(cb) {
        iconStream.pipe(gulp.dest('assets/fonts/')).on('finish', cb);
      },
    ],
    done
  );
});
