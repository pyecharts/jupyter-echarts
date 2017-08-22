var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var minify = require("gulp-minify");
var rename = require('gulp-rename');


FILES = [
	'./node_modules/echarts/dist/echarts.min.js',
	'./node_modules/echarts/map/js/china.js',
	'./node_modules/echarts/map/js/world.js',
	'./node_modules/echarts/map/js/province/*.js',
	'./node_modules/echarts-gl/dist/echarts-gl.min.js',
	'./node_modules/echarts-liquidfill/dist/echarts-liquidfill.min.js',
	'./node_modules/echarts-wordcloud/dist/echarts-wordcloud.min.js'
]

CITIES = [
	'world/china/cities/*.js'
]

gulp.task("default", function () {
	tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
	gulp.src(['dist/main.js'])
		.pipe(minify({
			ext: { src: ".js", min: ".js"}
		}))
		.pipe(gulp.dest('echarts'));
	gulp.src(CITIES, {base: './world'})
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('echarts'))
	return gulp.src(FILES, {base: './node_modules'})
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('echarts'));
});
