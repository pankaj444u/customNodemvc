var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	minify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify'),
	jshint = require('gulp-jshint'),
	clean = require('gulp-clean'),
	imagemin = require('gulp-imagemin'),
	runsequence= require('gulp-sequence');

gulp.task('clean', function(){

	return gulp.src('build', {read: false})
			.pipe(clean({force:true}));
});

gulp.task('lint',function(){

	return gulp.src(['employee/**/*.js','Handler/**/*.js','models/**/*.js','passport/**/*.js','routes/**/*.js','*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify-Config',function(){

		gulp.src('Config/*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build/Config'));
});

gulp.task('minify-employee',function(){

		gulp.src('employee/**/*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build/employee'));
});

gulp.task('minify-Handler',function(){

		gulp.src('Handler/**/*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build/Handler'));
});

gulp.task('minify-models',function(){

		gulp.src('models/**/*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build/models'));
});

gulp.task('minify-passport',function(){

		gulp.src('passport/**/*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build/passport'));
});

gulp.task('minify-routes',function(){

		gulp.src('routes/**/*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build/routes'));
});


gulp.task('minify-views',function(){

		gulp.src('views/**/*.html')
			.pipe(gulp.dest('build/views'));
});

gulp.task('minify',function(){

		gulp.src('*.js')
			.pipe(minify())
			.pipe(plumber())
			.pipe(gulp.dest('build'));
});



gulp.task('image',function(){
		gulp.src('public/*.png')
		.pipe(imagemin())
		.pipe(gulp.dest('build/public'))
});


gulp.task('utils',function(){

		gulp.src('utils/logger.js')
			.pipe(gulp.dest('build/utils'));
});

gulp.task('serve',function(){

	livereload.listen();
	nodemon({
		script: 'build/app.js',
		ext: 'js'
	}).on('restart',function(){
		gulp.src('build/app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page... Please wait.... here'));

	});
});

gulp.task('logs',function(){

		gulp.src('logs/*.*')
			.pipe(gulp.dest('build/logs'));
});


gulp.task('default', runsequence('clean','lint','minify-Config','minify-employee','minify-Handler','minify-models','minify-passport','minify-routes','minify-views','minify','image','utils','logs','serve'));