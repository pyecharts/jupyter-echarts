define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var version = '1.4.0';
    var echarts = '4.0.2';
    function load_ipython_extension() {
        console.log("jupyter-echarts " + version + " (echarts " + echarts + ") has been loaded");
    }
    exports.load_ipython_extension = load_ipython_extension;
});
