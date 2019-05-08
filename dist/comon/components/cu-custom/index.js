"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        bgColor: {
            type: String,
            default: ''
        },
        isCustom: {
            type: [Boolean, String],
            default: false
        },
        isBack: {
            type: [Boolean, String],
            default: false
        },
        bgImage: {
            type: String,
            default: ''
        },
    },
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom
    },
    methods: {
        BackPage: function () {
            wx.navigateBack({
                delta: 1
            });
        },
        toHome: function () {
            wx.reLaunch({
                url: '/pages/diary/timeline/index',
            });
        }
    }
});
