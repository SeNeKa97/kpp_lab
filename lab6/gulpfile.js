var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var server = require('gulp-express');
var lr = require('tiny-lr')();

gulp.task('default', function () {
    nodemon({
      script: 'server.js'
    })
    .on('restart', function () {
        console.log('restarted!')
    });

    lr.listen(35729);

    gulp.watch('server/**/*', function(event) {
      var fileName = require('path').relative('3000', event.path);
      lr.changed({
        body: {
          files: [fileName]
        }
      });
    });
});