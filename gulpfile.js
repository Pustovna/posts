const gulp = require('gulp');

const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

exports.style = tasks.style;
exports.libs_style = tasks.libs_style;
exports.html = tasks.html;
exports.rastr = tasks.rastr;
exports.webp = tasks.webp;
exports.ttf = tasks.ttf;
exports.bs_html = tasks.bs_html;
exports.dev_js = tasks.dev_js;
exports.build_js = tasks.build_js;
exports.watch = tasks.watch;

exports.default = gulp.parallel(
	exports.libs_style,
	exports.style,
	exports.html = tasks.html,
	exports.rastr,
	exports.webp,
	exports.ttf,
	exports.bs_html,
	exports.dev_js,
	exports.watch
)