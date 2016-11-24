var gulp = require('gulp');
var watchPath = require('gulp-watch-path');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var  del = require('del');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');                 
gulp.task('watchsass',function () {
    gulp.watch('src/sass/**/*', function (event) {
        var paths = watchPath(event, 'src/sass/', 'dist/')
        sass(paths.srcPath)
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            .pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})
gulp.task('concat', function() {    
    gulp.src(['./dist/*.css'])  
        .pipe(concat('style.min.css')) 
        .pipe(sourcemaps.init())
        .pipe(minifycss()) 
        .pipe(sourcemaps.write('./'))                                                             
        .pipe(gulp.dest('./dist/main/'))                            
});
gulp.task('default', [
   'watchsass'
    ]
)
gulp.task('release', ['concat']);