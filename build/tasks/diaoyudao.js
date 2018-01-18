var gulp = require('gulp');

var maker = require("echarts-mapmaker/src/maker");
var minify = require("gulp-minify");

// produce diaoyudao
gulp.task("diaoyudao", function(){
  maker.makeJs('taiwan/diaoyudao.json', './dist/diao4yu2dao3.js', '钓鱼岛');
  gulp.src('./dist/diao4yu2dao3.js', {base: './dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));

});
