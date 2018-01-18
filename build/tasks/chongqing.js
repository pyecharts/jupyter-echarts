var gulp = require('gulp');

var maker = require("echarts-mapmaker/src/maker");
var minify = require("gulp-minify");

// use custom tai wan map
gulp.task("kaizhouqu", function(){
  maker.decompress('node_modules/echarts/map/json/province/chongqing.json',
                   'decompressed_chongqing.json');
  maker.merge('decompressed_chongqing.json',
              'geosource/chongqing/kaixuan-e.json');
  maker.compress('merged_decompressed_chongqing.json',
                 'merged_compressed_chongqing.json');
  maker.makeJs('merged_compressed_chongqing.json', './dist/chongqing.js', '重庆');
  gulp.src('./dist/chongqing.js', {base: './dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));
  
});
