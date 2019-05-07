const app = getApp();

Page({
  onShow() {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 4
        })
      }
  },
  data: {
    hasUserInfo: false,
    userInfo: {},
    day: 2,
    targetDay: 7,
  },
  getUserInfo() {
    wx.getUserInfo({
      success:(res) => {
        const { userInfo } = res;
        console.log(userInfo);
        this.setData({
          userInfo,
          hasUserInfo: true
        })
      }
    });
  }
})

