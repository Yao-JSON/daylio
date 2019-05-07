"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assign_1 = require("lodash/assign");
var mergeOptionsToData = function (opts) {
    if (opts === void 0) { opts = {}; }
    var options = assign_1.default({}, opts);
    for (var key in options) {
        if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
            delete options[key];
        }
    }
    return options;
};
var bind = function (fn, ctx) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.length ? fn.apply(ctx, args) : fn.call(ctx);
    };
};
exports.default = Behavior({
    definitionFilter: function (defFields) {
        defFields.data = mergeOptionsToData(defFields.data);
        defFields.data.in = false;
        defFields.data.visible = false;
    },
    methods: {
        $$mergeOptionsToData: mergeOptionsToData,
        $$mergeOptionsAndBindMethods: function (opts, fns) {
            if (opts === void 0) { opts = {}; }
            if (fns === void 0) { fns = this.fns; }
            var options = Object.assign({}, opts);
            for (var key in options) {
                if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
                    fns[key] = bind(options[key], this);
                    delete options[key];
                }
            }
            return options;
        },
        $$setData: function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var params = assign_1.default.apply(void 0, [{}].concat(args));
            return new Promise(function (resolve) {
                _this.setData(params, resolve);
            });
        },
        $$requestAnimationFrame: function (callback, timeout) {
            if (callback === void 0) { callback = function () { }; }
            if (timeout === void 0) { timeout = 1000 / 60; }
            return new Promise(function (resolve) { return setTimeout(resolve, timeout); }).then(callback);
        },
    },
    created: function () {
        this.fns = {};
    },
    detached: function () {
        this.fns = {};
    },
});
