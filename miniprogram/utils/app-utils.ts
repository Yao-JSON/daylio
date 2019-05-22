const userInfoKey = "diary-userinfo-global-key";
const appAndOpenId = "diary-app-open-id-key";
const systemInfoKey = "diary-system-info-key";


const s = 1000;
const m = 60 * s;
const h = 60 * m;
const day = h * 24;
const week = day * 7;


export const appOnLaunch = (app) => {
  const now = new Date().getTime();
  // 获取用户信息
  try {
    const userInfo = wx.getStorageSync(userInfoKey);
    if(userInfo && userInfo.time  &&  now - userInfo.time  <= week) {
      app.globalData.userInfo = userInfo.data;
    } else {
      wx.getUserInfo({
        success(res) {
          const wxUserInfo: wx.UserInfo = res.userInfo;
          app.globalData.userInfo = wxUserInfo;
          try {
            wx.setStorageSync(userInfoKey, {time: now, data: wxUserInfo})
          } catch(e) {
            console.error(e);
          }
        },
        fail() {
          wx.showToast({
            title: "获取用户信息失败"
          })
        }
      })
    }
  }catch(e) {
    console.error(e);
  }

  // openId
  try {
    const openInfo = wx.getStorageSync(appAndOpenId);
    if(openInfo && openInfo.time && now - openInfo.time <= week) {
      const { openId, appId } = openInfo.data;
      app.globalData.openId = openId
      app.globalData.appId = appId
    } else {
      wx.cloud.callFunction({
        name: 'login',
        data: {}
      }).then((res) => {
        // @ts-ignore
        const { openid, appid } = res.result;
        app.globalData.openId = openid;
        app.globalData.appId = appid;
        try {
          wx.setStorageSync(appAndOpenId, {time: now, data: {openId: openid, appId: appid}})
        } catch(e) {
          console.error(e);
        }
      });
    }
  } catch(e) {
    console.error(e);
  }

  // 设备信息
  try {
    const systemInfo = wx.getStorageSync(systemInfoKey);
    if(systemInfo && systemInfo.time && now - systemInfo.time <= week) {
      const {navRect, systemInfoRes} = systemInfo.data;
      app.globalData.navRect = navRect;
      app.globalData.Custom = navRect;  
      app.globalData.SystemInfo = systemInfoRes;
      app.globalData.StatusBar = systemInfoRes.statusBarHeight;
      app.globalData.CustomBar = navRect.bottom + navRect.top - systemInfoRes.statusBarHeight;
    } else {
      const navRect = wx.getMenuButtonBoundingClientRect();
      app.globalData.navRect = navRect;
      app.globalData.Custom = navRect;  
      wx.getSystemInfo({
        success: systemInfoRes => {
          app.globalData.SystemInfo = systemInfoRes;
          app.globalData.StatusBar = systemInfoRes.statusBarHeight;
          app.globalData.CustomBar = navRect.bottom + navRect.top - systemInfoRes.statusBarHeight;

          try {
            wx.setStorageSync(systemInfoKey, {time: now, data: {navRect, systemInfoRes}})
          } catch(e) {
            console.error(e);
          }

        }
      })
    }
  } catch(e) {
    console.error(e);
  }
}
