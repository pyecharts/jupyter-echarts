var gulp = require('gulp');

var maker = require("echarts-mapmaker/src/maker");
var minify = require("gulp-minify");

// use custom tai wan map
gulp.task("hamishi", function(){
  maker.decompress('node_modules/echarts/map/json/province/xinjiang.json',
                   'd_xinjiang.json');
  maker.merge('d_xinjiang.json',
              'geosource/xinjiang/kunyushi.json');
  maker.merge('merged_d_xinjiang.json',
              'geosource/xinjiang/hamishi.json');
  maker.cut('merged_merged_d_xinjiang.json', '和田地区', '昆玉市');
  maker.compress('cut_merged_merged_d_xinjiang.json',
                 'merged_compressed_xinjiang.json');
  maker.makeJs('merged_compressed_xinjiang.json', './dist/xinjiang.js', '新疆');
  gulp.src('./dist/xinjiang.js', {base: './dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));
  
});
