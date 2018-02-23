var gulp = require('gulp');
var syncy = require('syncy');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var rmdir = require('rmdir');
var path = require('path');
var util = require('util');
var foreach = require('gulp-foreach');
var rename = require('gulp-rename');

//Clean lcc_modules
gulp.task('clean:lcc_modules', (done) => {
    rmdir('./lcc_modules', function (err, dirs, files) {
        done();
    });
});

//Sync assets to public folder excluding SASS files
gulp.task('sync:assets', (done) => {
    syncy(['app/assets/**/*', '!app/assets/sass/**', '!app/assets/*_subsite/**'], 'public', {
            ignoreInDest: '**/stylesheets/**',
            base: 'app/assets',
            updateAndDelete: true
        }).then(() => { 
            done();
    }).catch((err) => { done(err);})
});

//Sync lcc_frontend_toolkit to lcc_modules to be used for SASS partial compilation
gulp.task('sync:lcc_frontend_toolkit', ['sync:assets'], (done) => {
    syncy(['node_modules/lcc_frontend_toolkit/**'], 'lcc_modules/lcc_frontend_toolkit', {
            base: 'node_modules/lcc_frontend_toolkit',
            updateAndDelete: true
        }).then(() => { 
            done();
    }).catch((err) => { done(err);})
});

//Sync lcc_templates_nunjucks to lcc_modules
gulp.task('sync:lcc_templates_nunjucks', ['sync:lcc_frontend_toolkit'], (done) => {
    syncy(['node_modules/lcc_templates_nunjucks/**'], 'lcc_modules/lcc_templates_nunjucks', {
            base: 'node_modules/lcc_templates_nunjucks',
            update: true
        }).then(() => { 
            done();
    }).catch((err) => { done(err);})
})

//Compile SASS into the respective CSS and copy to public folder
gulp.task('sass', ['sync:lcc_templates_nunjucks'], function () {
    return gulp.src(['./app/assets/**/*.scss', '!app/assets/*_subsite/**'], {base:'./app/assets/sass'})
      .pipe(sass({includePaths: ['./app/assets',
            'lcc_modules/lcc_frontend_toolkit/stylesheets/']}).on('error', function (err) {
          notify({ title: 'SASS Task' }).write(err.line + ': ' + err.message);
          this.emit('end');
      }))
      .pipe(gulp.dest('./public/stylesheets/'))
});

//Compile subsites SASS
gulp.task('subsites:sass', ['sass'], (done) => {
     return gulp.src(['app/assets/*_subsite/sass/*.scss'])
        .pipe(foreach(function(stream, file) {          
            var subsite = (path.normalize(util.format('%s%s..', path.dirname(file.path), path.sep)).split(path.sep).pop()).split('_')[0];
            return stream.pipe(sass({includePaths: ['./app/assets/' + subsite,
                'lcc_modules/lcc_frontend_toolkit/stylesheets/']}).on('error', function (err) {
                notify({ title: 'SASS Task' }).write(err.line + ': ' + err.message);
                this.emit('end');
       	    }))
            .pipe(rename(function(path) {
                    path.dirname = "";
                    return path;
            }))
            .pipe(gulp.dest(util.format('./public/%s/stylesheets/', subsite)));     
        }))
})

//Copy subsites assets
gulp.task('subsites:assets', ['subsites:sass'], (done) => {
     return gulp.src(['app/assets/*_subsite/**/*.*', '!app/assets/*_subsite/sass/*.*'])
        .pipe(foreach(function(stream, file) {          
            var subsite = (path.normalize(util.format('%s%s..', path.dirname(file.path), path.sep)).split(path.sep).pop()).split('_')[0];
            return stream.pipe(rename(function(filePath) {
                console.log(path.sep)
                filePath.dirname = filePath.dirname.split(path.sep).pop();
                return filePath;
            }))
            .pipe(gulp.dest(util.format('./public/%s/', subsite)))
        }))
})

gulp.task('watch', ['subsites:assets'], function () {
    gulp.watch('app/assets/sass/**/*.scss', ['sass']);
    gulp.watch('app/assets/*_subsite/**/*.scss', ['subsites:assets']);
    gulp.watch(['app/assets/**/*', '!app/assets/sass/**', '!app/assets/*_subsite/sass/**'], ['sync:assets']);
})

gulp.task('nodemon', ['watch'], function () {
    nodemon({
        script: 'server.js',
        ignore: ['node_modules/**', 'app/assets/**', 'public/**'],
        ext: 'js json',
        env: { 'NODE_ENV': 'development' }
    })
});
 
gulp.task('generate-assets',  ['clean:lcc_modules', 'sync:assets', 'sync:lcc_frontend_toolkit', 'sync:lcc_templates_nunjucks', 'sass', 'subsites:sass', 'subsites:assets']);
gulp.task('default', ['generate-assets', 'watch', 'nodemon']);