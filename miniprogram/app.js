//app.js

let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';

try {
  backgroundImage = wx.getStorageSync(backgroundKey)
} catch (e) {
  // Do something when catch error
  backgroundImage = '';
  // backgroundImage = "https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165500-106393e0-47be-435a-b835-861da84ce2a8.jpeg"
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
  onHide() {
    const { backgroundImage } = this.globalData;
    wx.setStorage({
      key: backgroundKey, 
      data: backgroundImage || ''
    })
  },
  globalData: {
    backgroundImage,
  }
})
