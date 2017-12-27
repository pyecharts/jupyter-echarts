var gulp = require('gulp');
var rename = require('gulp-rename');

CITIES = [
    './node_modules/echarts-china-cities-js/dist/**/*.js'
]

gulp.task("cities", function (){
    gulp.src(CITIES, {base: './node_modules/echarts-china-cities-js/dist'})
	.pipe(rename(function (path){
	    path.basename = path.dirname + '_' + path.basename;
	    path.dirname = '';
	}))
	.pipe(gulp.dest('echarts'));
});
