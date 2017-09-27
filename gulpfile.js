var gulp = require("gulp");
var ts = require("gulp-typescript");
var fs = require("fs");
const pug = require("pug");
const path = require("path");
var tsProject = ts.createProject("tsconfig.json");
var minify = require("gulp-minify");
var rename = require('gulp-rename');


FILES = [
    './node_modules/echarts/dist/echarts.min.js',
    './node_modules/echarts-gl/dist/echarts-gl.min.js',
    './node_modules/echarts-liquidfill/dist/echarts-liquidfill.min.js',
    './node_modules/echarts-wordcloud/dist/echarts-wordcloud.min.js',
]

ECHARTS_BUILTIN_MAPS = [
  './node_modules/echarts/map/js/china.js',
  './node_modules/echarts/map/js/province/*.js',
  './optimized-world-js/world.js'
]

CITIES = [
    './node_modules/echarts-china-cities-js/dist/**/*.js'
]

COUNTRIES = [
  '!./node_modules/echarts-countries-js/dist/China.js',
  './node_modules/echarts-countries-js/dist/*.js'
]

FILE_MAP = {
    "echarts": 'echarts.min',
    "echartsgl": 'echarts-gl.min',
    "liquidfill": 'echarts-liquidfill.min',
    "world": 'world',
    "china": 'china',
    "wordcloud": 'echarts-wordcloud.min',
    "guangdong": "guangdong",
    "anhui": "anhui",
    "aomen": "aomen",
    "beijing": "beijing",
    "chongqing": "chongqing",
    "fujian": "fujian",
    "gansu": "gansu",
    "guangxi": "guangxi",
    "guizhou": "guizhou",
    "hainan": "hainan",
    "hebei": "hebei",
    "heilongjiang": "heilongjiang",
    "henan": "henan",
    "hebei": "hubei",
    "hunan": "hunan",
    "jiangsu": "jiangsu",
    "jiangxi": "jiangxi",
    "jilin": "jilin",
    "liaoning": "liaoning",
    "neimenggu": "neimenggu",
    "ningxia": "ningxia",
    "qinghai": "qinghai",
    "shandong": "shandong",
    "shanghai": "shanghai",
    "shanxi": "shanxi",
    "shanxi1": "shanxi1",
    "sichuan": "sichuan",
    "taiwan": "taiwan",
    "tianjin": "tianjin",
    "xianggang": "xianggang",
    "xinjiang": "xinjiang",
    "xizang": "xizang",
    "yunnan": "yunnan",
    "zhejiang": "zhejiang"
}

PROVINCE_PINYIN_MAP = {
    "广东": "guangdong",
    "安徽": "anhui",
    "澳门": "aomen",
    "北京": "beijing",
    "重庆": "chongqing",
    "福建": "fujian",
    "甘肃": "gansu",
    "广西": "guangxi",
    "贵州": "guizhou",
    "海南": "hainan",
    "河北": "hebei",
    "黑龙江": "heilongjiang",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "江苏": "jiangsu",
    "江西": "jiangxi",
    "吉林": "jilin",
    "辽宁": "liaoning",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "青海": "qinghai",
    "山东": "shandong",
    "上海": "shanghai",
    "山西": "shanxi",
    "陕西": "shanxi1",
    "四川": "sichuan",
    "台湾": "taiwan",
    "天津": "tianjin",
    "香港": "xianggang",
    "新疆": "xinjiang",
    "西藏": "xizang",
    "云南": "yunnan",
    "浙江": "zhejiang"
}

gulp.task("echarts-maps", function(){
  gulp.src(ECHARTS_BUILTIN_MAPS)
    .pipe(rename({dirname: ''}))
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));

});

gulp.task("cities", function (){
    gulp.src(CITIES, {base: './node_modules/echarts-china-cities-js/dist'})
	.pipe(rename(function (path){
	    path.basename = path.dirname + '_' + path.basename;
	    path.dirname = '';
	}))
	.pipe(gulp.dest('echarts'));
});

gulp.task("countries", function (){
    gulp.src(COUNTRIES, {base: './node_modules/echarts-countries-js/dist'})
	.pipe(minify({
      noSource: true,
	  ext: { min: ".js"}
	}))
	.pipe(gulp.dest('echarts'));
});

gulp.task("configuration", function () {
  var data = fs.readFileSync('./node_modules/echarts-china-cities-js/dist/config.json', 'utf8');
  var obj = JSON.parse(data);
  var countries = fs.readFileSync('./node_modules/echarts-countries-js/dist/config.json', 'utf8');
  var countryRegistry = JSON.parse(countries);
  for (var city in obj.FILE_MAP){
    var value = obj.FILE_MAP[city]
    obj.FILE_MAP[city] = value.replace('/', '_').replace('.js', '')
  }
  obj.FILE_MAP = Object.assign({}, obj.FILE_MAP, countryRegistry.FILE_MAP, FILE_MAP);
  obj.PINYIN_MAP = Object.assign({}, obj.PINYIN_MAP, countryRegistry.PINYIN_MAP, PROVINCE_PINYIN_MAP);
  fs.writeFile('./echarts/registry.json', JSON.stringify(obj, null, 4), function (err){
    if (err) throw err;
  });

});

gulp.task("preview", function(){
  var index = pug.compileFile(path.join("templates", "preview.pug"));
  var provinces = Object.keys(PROVINCE_PINYIN_MAP);
  provinces.push('china');
  provinces.push('world');
  var options = {
    countryFiles:  Object.values(FILE_MAP),
    countries: provinces};
  fs.writeFile('preview.html', index(options), function(err){
    if(err) throw err;
  });
});

gulp.task("default", ["echarts-maps", "cities", "countries", "configuration", "preview"], function () {
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
