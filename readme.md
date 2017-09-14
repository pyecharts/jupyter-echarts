# Jupyter-Echarts

It integrates echarts to jupyter notebook as nbextensions and echarts libraries will be served from http://localhost:8888/nbextensions/echarts/.

## Content

1. echarts
1. echarts-gl
1. echarts-liquidfill
1. echarts-wordcloud
1. echarts maps: world, china, 28 province maps, 369 city maps.

## Installation

```shell
jupyter nbextension install echarts
jupyter nbextension enable echarts/main
```

## Alternative usage

For github hosted files, please use `https://chfw.github.io/jupyter-echarts/` prefix, put the folder name `echarts` and place the actual javascript file name. For example, the url for a github hosted `echarts.min.js` is https://chfw.github.io/jupyter-echarts/echarts/echarts.min.js.

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

The city maps 