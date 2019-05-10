const app = getApp();

interface IAboutDataProps {
  data: {
    hasUserInfo: boolean;
    day?: number;
    userInfo?: Record<string, any>,
    targetDay?: number 
  },
  getUserInfo: () => void
}

Page<IAboutDataProps, IAboutDataProps>({
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

