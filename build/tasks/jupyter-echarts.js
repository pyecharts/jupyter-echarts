var gulp = require('gulp');

var ts = require("gulp-typescript");
var fs = require("fs");
const pug = require("pug");
const path = require("path");
var tsProject = ts.createProject("tsconfig.json");
var minify = require("gulp-minify");
var rename = require('gulp-rename');
var maker = require("echarts-mapmaker/src/maker");

FILES = [
    './node_modules/echarts/dist/echarts.min.js',
    './node_modules/echarts-gl/dist/echarts-gl.min.js',
    './node_modules/echarts-liquidfill/dist/echarts-liquidfill.min.js',
    './node_modules/echarts-wordcloud/dist/echarts-wordcloud.min.js',
]

FILE_MAP = {
    "echarts": 'echarts.min',
    "echartsgl": 'echarts-gl.min',
    "liquidfill": 'echarts-liquidfill.min',
    "wordcloud": 'echarts-wordcloud.min'
}

gulp.task("configuration", function () {
  obj = {};
  obj.FILE_MAP = {};
  obj.PINYIN_MAP = {};
  obj.JUPYTER_URL = '/nbextensions/echarts';
  obj.JUPYTER_ENTRY = 'echarts/main';
  obj.JS_FOLDER = 'echarts';
  obj.GITHUB_URL = 'https://pyecharts.github.io/jupyter-echarts/echarts';
  fs.writeFile('./registry.json', JSON.stringify(obj, null, 4), function (err){
    if (err) throw err;
  });

});

gulp.task("main", function(){
    tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
    gulp.src(['dist/main.js'])
	.pipe(minify({
	    ext: { src: ".js", min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));
    return gulp.src(FILES, {base: './node_modules'})
	.pipe(rename({dirname: ''}))
	.pipe(gulp.dest('echarts'));
});
