"use strict";
var backgroundImage = '';
var backgroundKey = 'diary-global-background-image';
try {
    backgroundImage = wx.getStorageSync(backgroundKey);
}
catch (e) {
    backgroundImage = '';
}
