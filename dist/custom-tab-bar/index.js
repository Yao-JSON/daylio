"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalData = (function () {
    function GlobalData() {
        this.data = {};
    }
    GlobalData.prototype.get = function (key) {
        return this.data[key] || null;
    };
    GlobalData.prototype.set = function (key, value) {
        this.data[key] = value;
        return this;
    };
    return GlobalData;
}());
exports.globalData = new GlobalData();
