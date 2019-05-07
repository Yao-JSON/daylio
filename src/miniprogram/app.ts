let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';


try {
  backgroundImage = wx.getStorageSync(backgroundKey)
} catch (e) {
  backgroundImage = '';
}

enum moodData {
  "超烂" = 1,
  "不爽" = 2,
  "一般" = 3,
  "开心" = 4,
  "狂喜" = 5
}


interface IMyApp {
  globalData: {
    backgroundImage: string;
    [propsName: string]: any;
  }
}

App<IMyApp>({  
  globalData: {
    backgroundImage,
    moodData,
  },
  onLaunch() {
    if(!wx.cloud) {
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
  }
})
