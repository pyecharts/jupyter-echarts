# Jupyter-Echarts

It integrates echarts to jupyter notebook as nbextensions and echarts libraries will be served from http://localhost:8888/nbextensions/echarts/.


## Installation

```shell
jupyter nbextension install echarts
jupyter nbextension enable echarts/main
```

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