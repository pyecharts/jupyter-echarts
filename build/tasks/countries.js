var gulp = require('gulp');

var minify = require("gulp-minify");
var rename = require('gulp-rename');

gulp.task("countries", function (){
    gulp.src(COUNTRIES, {base: './node_modules/echarts-countries-js/dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));
});
