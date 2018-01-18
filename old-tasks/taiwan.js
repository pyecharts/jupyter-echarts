var gulp = require('gulp');

var maker = require("echarts-mapmaker/src/maker");
var minify = require("gulp-minify");

// use custom tai wan map
gulp.task("taiwan", function(){
  maker.merge('taiwan/taiwan.json',
              'taiwan/diaoyudao.json');
  maker.compress('merged_taiwan.json', 'merged_and_compressed_taiwan.json');
  maker.makeJs('merged_and_compressed_taiwan.json', './dist/taiwan.js', '台湾');
  gulp.src('./dist/taiwan.js', {base: './dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));

});
