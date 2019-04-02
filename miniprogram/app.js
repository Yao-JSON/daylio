//app.js
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
        console.log(navRect);
        this.globalData.SystemInfo = e;
        this.globalData.navRect = navRect;
      }
    })
  },
  globalData: {}
})
