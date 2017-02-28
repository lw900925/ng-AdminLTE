/**
 * Created by liuwei on 2017/2/27.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),         // 压缩css
    jshint = require('gulp-jshint'),                // 代码验证检查
    uglify = require('gulp-uglify'),                // 压缩js代码
    rename = require('gulp-rename'),                // 文件重命名
    concat = require('gulp-concat'),                // 合并js文件
    notify = require('gulp-notify'),                // 更改提醒
    imagemin = require('gulp-imagemin'),            // 压缩图片
    htmlmin = require('gulp-htmlmin'),              // 压缩html
    livereload = require('gulp-livereload'),        // 自动刷新页面
    ngAnnotate = require('gulp-ng-annotate'),       // ng-annotate
    connect = require('gulp-connect'),              // web服务器集成
    clean = require('gulp-clean');                  // 删除目录或文件

// 清理dist目录
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

// 打包html
gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(htmlmin({
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
});

// 打包第三方依赖
gulp.task('lib', function () {
    return gulp.src('app/lib/**')
        .pipe(gulp.dest('dist/lib'));
});

// 打包图片
gulp.task('image', function () {
    return gulp.src('app/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// 打包并压缩样式文件
gulp.task('style', function () {
    return gulp.src('app/css/**')
        .pipe(concat('style.css'))              // 将多个css文件合并为一个，并重命名为style.css
        .pipe(minifycss())                      // 压缩css文件
        .pipe(gulp.dest('dist/css'));
});

// 压缩javascript
gulp.task('script', function () {
    return gulp.src('app/js/**/*.js')
        //.pipe(jshint('.jshintrc'))              // 根据.jshintrc文件中定义的规则校验javascript
        //.pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist/js'))
        .pipe(ngAnnotate({ single_quotes: true }))
        .pipe(uglify())                         // 压缩js文件
        .pipe(gulp.dest('dist/js'));
});

// 拷贝国际化资源文件
gulp.task('i18n', function () {
    return gulp.src('app/i18n/**')
        .pipe(gulp.dest('dist/i18n'));
});

// 构建项目
gulp.task('build', ['clean'], function () {
    return gulp.start('html', 'lib', 'image', 'style', 'script', 'i18n');
});

// 监听本地文件改动，自动构建
gulp.task('watch', ['build'], function () {
    gulp.watch('app/css/**/*.css', ['style']);
    gulp.watch('app/js/**/*.js', ['script']);
    gulp.watch('app/partials/**/*.html', ['html']);
    gulp.watch('app/img/**', ['image']);
    gulp.watch('app/i18n/*.json', ['i18n']);
});

// 本地运行web项目
gulp.task('server', ['watch'], function () {
    connect.server({
        root: 'dist',
        port: 8080,
        livereload: true
    });
});

// gulp默认任务
gulp.task('default', function () {
    return gulp.start('help');
});

// 帮助信息
gulp.task('help', function () {
    console.log('   gulp clean      清理dist目录');
    console.log('   gulp html       压缩html文件');
    console.log('   gulp lib        拷贝第三方依赖');
    console.log('   gulp image      压缩图片');
    console.log('   gulp style      压缩css文件');
    console.log('   gulp script     压缩js文件');
    console.log('   gulp i18n       拷贝国际化资源文件');
    console.log('   gulp build      构建项目');
    console.log('   gulp watch      文件监控打包');
    console.log('   gulp server     本地运行');
});



