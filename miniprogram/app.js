//app.js

let backgroundImage = '';

try {
  backgroundImage = wx.getStorageSync(backgroundKey)
} catch (e) {
  // Do something when catch error
  backgroundImage = "https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165500-106393e0-47be-435a-b835-861da84ce2a8.jpeg"
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
      }
    })
  },
  globalData: {
    backgroundImage,
  }
})
