//app.js

let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';

try {
  backgroundImage = wx.getStorageSync(backgroundKey)
} catch (e) {
  backgroundImage = '';
}

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.getSystemInfo({
      success: e => {
        const navRect = wx.getMenuButtonBoundingClientRect();
        this.globalData.SystemInfo = e;
        this.globalData.navRect = navRect;
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.Custom = navRect;  
        this.globalData.CustomBar = navRect.bottom + navRect.top - e.statusBarHeight;
      }
    })
  },
  onHide() {
    const { backgroundImage } = this.globalData;
    wx.setStorage({
      key: backgroundKey, 
      data: backgroundImage || ''
    })
  },
  globalData: {
    backgroundImage,
    moodData: {
      1: "超烂",
      2: "不爽",
      3: "还行",
      4: "开心",
      5: "狂喜"
    }
  }
})
