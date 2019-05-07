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
var utils_1 = require("./../comon/utils");
var baseComponent_1 = require("./../miniprogram/wux/helpers/baseComponent");
baseComponent_1.default({
    useFunc: true,
    options: {
        addGlobalClass: true,
    },
    data: {
        selected: 2,
        list: [
            {
                "pagePath": "/pages/diary/list/diary",
                "text": "日记",
                "icon": "ios-paper",
                "iconFill": "ios-paper",
                "action": "switchTab"
            },
            {
                "pagePath": "/pages/chart/chart",
                "text": "报表",
                "icon": "ios-stats",
                "iconFill": "ios-stats",
                "action": "switchTab"
            },
            {
                "type": "button",
                "text": "发布 ",
                "className": "shadow",
                "action": "switchTab"
            },
            {
                "pagePath": "/pages/calendar/calendar",
                "text": "日历",
                "icon": 'ios-calendar',
                "iconFill": 'ios-calendar',
                "action": "switchTab"
            },
            {
                "pagePath": "/pages/about/about",
                "text": "我的",
                "action": "switchTab",
                "icon": "ios-person",
                "iconFill": "ios-person"
            }
        ],
        visible: false,
        imageList: utils_1.backgroundImageList.concat([null]),
        onChange: function () { },
        buttons: [
            {
                label: "昨天",
            },
            {
                label: "今天"
            },
            {
                label: "其他日期"
            }
        ]
    },
    methods: {
        switchTab: function (e) {
            var url = e.currentTarget.dataset.url;
            if (url) {
                wx.switchTab({
                    url: url
                });
            }
        },
        onClose: function () {
            this.setData({
                visible: false
            });
        },
        onShow: function (opts) {
            var _this = this;
            if (opts === void 0) { opts = {}; }
            var options = this.$$mergeOptionsAndBindMethods(Object.assign({}, this.data, opts));
            this.$$setData(__assign({}, options)).then(function () {
                _this.setData({
                    visible: true
                });
            });
        },
        onImageSelect: function (e) {
            var dataset = e.currentTarget.dataset;
            if (this.fns.onChange && typeof this.fns.onChange === 'function') {
                this.fns.onChange.call(this, dataset.src);
            }
        },
        onNewDiary: function (e) {
            var index = e.detail.index;
            if (index === 0 || index === 1) {
                var today = new Date().getTime();
                var lastDay = today - 86400000;
                var url = '/pages/new-diary/select-mood/index';
                utils_1.globalData.set('date', {
                    index: index,
                    time: index === 0 ? lastDay : today
                });
                wx.navigateTo({
                    url: url,
                    fail: function (e) {
                        console.log(e);
                    }
                });
                return;
            }
        }
    },
});
