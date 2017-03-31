var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	//less = require('gulp-less'),
	//concat = require('gulp-concat'),
	//uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	path = {
		LESS: './src/*.less',
		//CSS: './web/css/*.css',
		CSS: './js/*.css',
		//HTML: './*.html',
		HTML: './js/*.html',
		//JS: './web/js/*.js'
		JS: './js/*.js'
	};
gulp.task('server',function(){
	connect.server({
		root: './',
		port: 802,
		livereload: true
	});
})
//处理js文件
//gulp.task('scriptHandle',function(){
//  gulp.src(path.JS).pipe(uglify({
//      mangle: {except: ['require','exports','module','$']}//排除混淆关键字
//  })).pipe(gulp.dest('dest/js'));
//});
gulp.task('watch',function(){
	gulp.watch(path.CSS,['reload']);
	gulp.watch(path.HTML,['reload']);
	gulp.watch(path.JS,['reload']);
});
gulp.task('reload',function () {
    gulp.src('./*.html').pipe(connect.reload());
});

gulp.task('default',['watch','server']);
