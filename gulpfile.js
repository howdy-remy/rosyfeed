var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
	return browserify('./extension/content.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./extension'));
});

gulp.task('default', function () {
	gulp.watch('extension/*', ['browserify'])
})
