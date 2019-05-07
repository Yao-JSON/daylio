"use strict";
var backgroundImage = '';
var backgroundKey = 'diary-global-background-image';
try {
    backgroundImage = wx.getStorageSync(backgroundKey);
}
catch (e) {
    backgroundImage = '';
}
var moodData;
(function (moodData) {
    moodData[moodData["\u8D85\u70C2"] = 1] = "\u8D85\u70C2";
    moodData[moodData["\u4E0D\u723D"] = 2] = "\u4E0D\u723D";
    moodData[moodData["\u4E00\u822C"] = 3] = "\u4E00\u822C";
    moodData[moodData["\u5F00\u5FC3"] = 4] = "\u5F00\u5FC3";
    moodData[moodData["\u72C2\u559C"] = 5] = "\u72C2\u559C";
})(moodData || (moodData = {}));
App({
    globalData: {
        backgroundImage: backgroundImage,
        moodData: moodData,
    },
    onLaunch: function () {
        var _this = this;
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        }
        else {
            wx.cloud.init({
                traceUser: true,
            });
        }
        wx.getSystemInfo({
            success: function (e) {
                var navRect = wx.getMenuButtonBoundingClientRect();
                _this.globalData.SystemInfo = e;
                _this.globalData.navRect = navRect;
                _this.globalData.StatusBar = e.statusBarHeight;
                _this.globalData.Custom = navRect;
                _this.globalData.CustomBar = navRect.bottom + navRect.top - e.statusBarHeight;
            }
        });
    },
    onHide: function () {
        var backgroundImage = this.globalData.backgroundImage;
        wx.setStorage({
            key: backgroundKey,
            data: backgroundImage || ''
        });
    }
});
