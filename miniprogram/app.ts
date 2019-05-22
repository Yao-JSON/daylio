let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';
import { IMyApp } from "./../interface"

import { appOnLaunch } from './utils/app-utils'

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



App<IMyApp>({  
  globalData: {
    backgroundImage,
    moodData,
    userInfo: null,
  },
  onLaunch() {
    wx.cloud.init({
      traceUser: true,
    })
    appOnLaunch(this);
  },
  onHide() {
    const { backgroundImage } = this.globalData;
    wx.setStorage({
      key: backgroundKey,
      data: backgroundImage || ''
    })
  }
})
