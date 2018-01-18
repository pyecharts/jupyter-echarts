var gulp = require('gulp');

var maker = require("echarts-mapmaker/src/maker");
var minify = require("gulp-minify");

// fix issue 9
gulp.task("chongming", function(){
  maker.merge('shanghai-chongming/shanghai-without-chongming.json',
              'shanghai-chongming/chongming.json');
  maker.makeJs('merged_shanghai-without-chongming.json', './dist/shanghai.js', '上海');
  gulp.src('./dist/shanghai.js', {base: './dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));

});
