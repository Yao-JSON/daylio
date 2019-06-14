let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';

import { IMyApp } from "./../interface"

import { appOnLaunch, databaseEnv, initUserMoods, initUserActives, initUsers } from './comon/utils/index'

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
    phoneNumber: null
  },
  onLaunch() {
    wx.cloud.init({
      traceUser: true,
      env: databaseEnv
    })
    appOnLaunch(this).then((res) => {
      console.log(res);
      // @ts-ignore
      const { openId } = res;
      initUsers(openId).then(() => {
        // 初始化心情
        initUserMoods(openId);
        // 初始化活动
        initUserActives(openId);
      })
    });
  },
  onHide() {
    const { backgroundImage } = this.globalData;
    wx.setStorage({
      key: backgroundKey,
      data: backgroundImage || ''
    })
  }
})
