# Jupyter-Echarts

It integrates echarts to jupyter notebook as nbextensions and echarts libraries will be served from http://localhost:8888/nbextensions/echarts/.


It is embedded in [pyecharts](https://github.com/chenjiandongx/pyecharts) v0.1.9.5+. No action is required from pyecharts users.

## Content

1. echarts
1. echarts-gl
1. echarts-liquidfill
1. echarts-wordcloud
1. echarts-china-cities-js: World, China, 28 province maps, 369 city maps.
1. echarts-countries-js: 212 countries excluding China

## Installation to jupyter

```shell
jupyter nbextension install echarts
jupyter nbextension enable echarts/main
```

## Alternative usage

For github hosted files, please use `https://chfw.github.io/jupyter-echarts/` prefix, put the folder name `echarts` and place the actual javascript file name. For example, the url for a github hosted `echarts.min.js` is https://chfw.github.io/jupyter-echarts/echarts/echarts.min.js.

### Example

```
<html>
  <head>
    <meta charset="utf-8" />
	<style>
	  .citymap{
	  width: 100%;
	  height: 100%;
	  }
	</style>
  	<script src="https://chfw.github.io/jupyter-echarts/echarts/echarts.min.js"></script>
	<script src="https://chfw.github.io/jupyter-echarts/echarts/jiang1_xi1/nan2_chang1.js"></script>
  </head>
  <body>
	<div id='nan2_chang1' class='citymap'></div>
	<script src='https://chfw.github.io/echarts-china-cities-js/demo.js'></script>
	<script>
	  make_city('南昌', 'nan2_chang1');
	</script>
  </body>
</html>
```

![Usage with echarts](https://chfw.github.io/echarts-china-cities-js/nanchang.png)

## Development

Please get all depdencies

```shell
npm install -g gulp
npm install
```

Then build

```shell
gulp
```

You will then obtain all echarts libraries in echarts folder.


## License

This bundling code is MIT license
The echarts libraries are under BSD-3 license of Baidu Inc.


### City maps License

The geojson files are downloaded from AMap.com(高德地图) via [echarts-map-tool](http://ecomfe.github.io/echarts-map-tool/),
hence are subjected to AMap's [service and content license](https://lbs.amap.com/home/terms/).

**No content right** have been transferred to you and you shall **engage AMap.com** before
making commercial applications using the files in this package. No Liability nor Guarantee were
given for any error or flaws in the downloaded files.

#### Free usage instructions

Similiar to google's map data, it is free as long as the public's access to your files
are free. 

This bundling code(makedemo.py) is MIT license.
