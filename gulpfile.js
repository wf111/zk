var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var css = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
gulp.task('sass', function() { //编译sass
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(css()) //压缩css
        .pipe(gulp.dest('./dist/css'))
})
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.js')) //合并js
        .pipe(uglify()) //压缩js
        .pipe(gulp.dest('./dist/js'))
})
gulp.task('webserver', function() { //起服务
    return gulp.src('./src')
        .pipe(webserver({
            port: 8788, //端口号
            open: true, //自动打开
            livereload: true //自动刷新
        }))
})
gulp.task('watch', function() { //监听
    return gulp.watch('./src/sass', gulp.series('sass'))
})
gulp.task('default', gulp.series('sass', 'css', 'uglify', 'webserver', 'watch'))
gulp.task('build', gulp.parallel('css', 'uglify'))