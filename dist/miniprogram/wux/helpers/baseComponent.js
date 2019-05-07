"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var computedBehavior_1 = require("./computedBehavior");
var relationsBehavior_1 = require("./relationsBehavior");
var safeSetDataBehavior_1 = require("./safeSetDataBehavior");
var funcBehavior_1 = require("./funcBehavior");
var baseComponent = function (options) {
    if (options === void 0) { options = {}; }
    options.externalClasses = [
        'wux-class',
        'wux-hover-class'
    ].concat((options.externalClasses = options.externalClasses || []));
    options.behaviors = [
        relationsBehavior_1.default,
        computedBehavior_1.default,
        safeSetDataBehavior_1.default
    ].concat((options.behaviors = options.behaviors || []));
    if (options.useFunc) {
        options.behaviors = options.behaviors.concat([funcBehavior_1.default]);
        delete options.useFunc;
    }
    if (options.useField) {
        options.behaviors = options.behaviors.concat(['wx://form-field']);
        delete options.useField;
    }
    if (options.useExport) {
        options.behaviors = options.behaviors.concat(['wx://component-export']);
        options.methods = __assign({ export: function () {
                return this;
            } }, options.methods);
        delete options.useExport;
    }
    options.options = __assign({ multipleSlots: true, addGlobalClass: true }, options.options);
    return Component(options);
};
exports.default = baseComponent;
