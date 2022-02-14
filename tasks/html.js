const {
	src,
	dest
} = require('gulp');
const include = require('gulp-file-include');
const bs = require('browser-sync');

module.exports = function html() {
	return src(['src/index.html'])
		.pipe(include())
		.pipe(dest('build/'))
    	.pipe(bs.stream({match: '**/*.html'}))
}