define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function load_ipython_extension() {
        console.log("I have been loaded ! -- my nb extension");
    }
    exports.load_ipython_extension = load_ipython_extension;
});
