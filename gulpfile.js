var gulp = require("gulp");
var ts = require("gulp-typescript");
var fs = require("fs");
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
    './node_modules/echarts/map/js/world.js',
    './node_modules/echarts/map/js/province/*.js',
]

CITIES = [
    './node_modules/echarts-china-cities-js/dist/**/*.js'
]

FILE_MAP = {
    "echarts": 'echarts.min',
    "echartsgl": 'echarts-gl.min',
    "liquidfill": 'echarts-liquidfill.min',
    "world": 'world.min',
    "china": 'china.min',
    "wordcloud": 'echarts-wordcloud.min',
    "guangdong": "guangdong.min",
    "anhui": "anhui.min",
    "aomen": "aomen.min",
    "beijing": "beijing.min",
    "chongqing": "chongqing.min",
    "fujian": "fujian.min",
    "gansu": "gansu.min",
    "guangxi": "guangxi.min",
    "guizhou": "guizhou.min",
    "hainan": "hainan.min",
    "hebei": "hebei.min",
    "heilongjiang": "heilongjiang.min",
    "henan": "henan.min",
    "hebei": "hubei.min",
    "hunan": "hunan.min",
    "jiangsu": "jiangsu.min",
    "jiangxi": "jiangxi.min",
    "jilin": "jilin.min",
    "liaoning": "liaoning.min",
    "neimenggu": "neimenggu.min",
    "ningxia": "ningxia.min",
    "qinghai": "qinghai.min",
    "shandong": "shandong.min",
    "shanghai": "shanghai.min",
    "shanxi": "shanxi.min",
    "shanxi1": "shanxi1.min",
    "sichuan": "sichuan.min",
    "taiwan": "taiwan.min",
    "tianjin": "tianjin.min",
    "xianggang": "xianggang.min",
    "xinjiang": "xinjiang.min",
    "xizang": "xizang.min",
    "yunnan": "yunnan.min",
    "zhejiang": "zhejiang.min"
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
    gulp.src(ECHARTS_BUILTIN_MAPS, {base: './node_modules'})
        .pipe(rename({dirname: ''}))
	.pipe(minify({
            noSource: true,
	    ext: { min: ".min.js"}
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

gulp.task("configuration", function () {
    fs.readFile('./node_modules/echarts-china-cities-js/dist/config.json', 'utf8', function (err, data) {
	if (err) throw err; // we'll not consider error handling for now
	var obj = JSON.parse(data);
	for (var city in obj.FILE_MAP){
	    var value = obj.FILE_MAP[city]
	    obj.FILE_MAP[city] = value.replace('/', '_').replace('.js', '')
	}
	obj.FILE_MAP = Object.assign({}, obj.FILE_MAP, FILE_MAP);
	obj.PINYIN_MAP = Object.assign({}, obj.PINYIN_MAP, PROVINCE_PINYIN_MAP);
	fs.writeFile('./echarts/registry.json', JSON.stringify(obj, null, 4), function (err){
	    if (err) throw err;
	});
    });

});

gulp.task("default", ["echarts-maps", "cities", "configuration"], function () {
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
