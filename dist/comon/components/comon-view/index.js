"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseComponent_1 = require("./../../wux/helpers/baseComponent");
var app = getApp();
var _a = app.globalData, SystemInfo = _a.SystemInfo, navRect = _a.navRect, backgroundImage = _a.backgroundImage;
var screenHeight = SystemInfo.screenHeight - navRect.bottom;
baseComponent_1.default({
    externalClasses: ['wux-class'],
    properties: {
        isHasCustomBar: {
            type: Boolean,
            value: false
        },
        windowHeight: {
            type: Number,
            value: SystemInfo.windowHeight
        },
        screenHeight: {
            type: Number,
            value: screenHeight
        }
    },
    data: {
        visible: false,
        backgroundImage: backgroundImage,
    },
    methods: {
        onLongPress: function () {
            var _this = this;
            if (typeof this.getTabBar === 'function') {
                var cusTabBar = this.getTabBar();
                if (cusTabBar) {
                    cusTabBar.onShow({
                        onChange: function (src) {
                            _this.setData({
                                backgroundImage: src
                            });
                            app.globalData.backgroundImage = src;
                        }
                    });
                }
            }
        }
    },
    pageLifetimes: {
        show: function () {
            var newApp = getApp();
            var backgroundImage = newApp.globalData.backgroundImage;
            this.setData({
                backgroundImage: backgroundImage
            });
        }
    }
});
