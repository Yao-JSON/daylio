let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';

import { IMyApp } from "./../interface"
import { appOnLaunch, databaseEnv, appInit } from './comon/utils/index';

// import { userInfoKey, systemInfoKey } from './comon/constant/index'


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
    openId: null,
  },
  onLaunch() {
    wx.cloud.init({
      traceUser: true,
      env: databaseEnv
    });
  
    appOnLaunch(this);
    appInit(this).then((res) => {
      console.log(res);
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
