const userInfoKey = "diary-userinfo-global-key";
const appAndOpenId = "diary-app-open-id-key";
const systemInfoKey = "diary-system-info-key";


const s = 1000;
const m = 60 * s;
const h = 60 * m;
const day = h * 24;
const week = day * 7;

export const databaseEnv = 'test-r8ve0';

export const diaryMoods = "diary-moods";
export const diaryActives = "diary-actives";
export const diaryUsers = "diary-users";


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

  return new Promise((resolve, reject) => {
    // openId
    try {
      const openInfo = wx.getStorageSync(appAndOpenId);
      if(openInfo && openInfo.time && now - openInfo.time <= week) {
        const { openId, appId } = openInfo.data;
        app.globalData.openId = openId;
        app.globalData.appId = appId;
        resolve(app.globalData)
      } else {
        wx.cloud.callFunction({
          name: 'login',
          data: {}
        }).then((res) => {
          console.log(res);
          // @ts-ignore
          const { openId, appId, userInfo } = res.result;
          app.globalData.openId = openId || userInfo.openId;
          app.globalData.appId = appId || userInfo.appId;
          try {
            wx.setStorageSync(appAndOpenId, {time: now, data: {openId: openId || userInfo.openId, appId: appId || userInfo.appId}});
          } catch(e) {
            console.error(e);
            reject(e)
          }

          resolve(app.globalData)
        });
      }
    } catch(e) {
      console.error(e);
      reject(e);
    }
  })
}


export const initUsers = (openId) => {
  const db = wx.cloud.database();
  const diaryUserdsCol = db.collection(diaryUsers);
  return new Promise((resolve) => {
    diaryUserdsCol.doc(openId).get({
      fail() {
        diaryUserdsCol.add({
          data: {
            _id: openId,
            createTime: new Date().getTime(),
            updateTime: new Date().getTime(),
          },
          success() {
            resolve();
          }
        })
      },
      success() {
        resolve();
      }
    })
  })
}


export const initUserMoods = (openId) => {
  const db = wx.cloud.database();
  const diaryMoodsCol = db.collection(diaryMoods);
  diaryMoodsCol.doc(openId).get({
    fail() {
      // 初始化 心情列表
      diaryMoodsCol.add({
        data: {
          createTime: new Date().getTime(),
          updateTime: new Date().getTime(),
          data: {
            happy: {
              list: [
                {
                  iconType: 'happy-daxiao',
                  title: '大笑',
                  remark: '',
                },
              ],
              level: 5,
              label: "狂喜"
            },
            kaixin: {
              list: [
                {
                  iconType: 'kaixin-quiet',
                  title: '开心',
                  remark: ''
                }
              ],
              level: 4,
              label: "开心"
            },
            yiban: {
              list: [
                {
                  iconType: 'yiban-headache',
                  title: '一般',
                  remark: ''
                }
              ],
              level: 3,
              label: "一般"
            },
            bushuang: {
              list: [
                {
                  iconType: 'bushuang-layer',
                  title: '伤心',
                  remark: ''
                }
              ],
              level: 2,
              label: "不爽"
            },
            chaolan: {
              list: [
                {
                  iconType: 'chaolan-kulian',
                  title: '流泪',
                  remark: ''
                }
              ],
              level: 1,
              label: "超烂"
            },
          }
        },
        fail: console.error
      })
    },
  })


}
export const initUserActives = (openId) => {
  const db = wx.cloud.database();
  const diaryActivesCol = db.collection(diaryActives)
  diaryActivesCol.doc(openId).get({
    fail() {
      // 初始化活动列表
      diaryActivesCol.add({
        data: {
          _id: openId,
          createTime: new Date().getTime(),
          updateTime: new Date().getTime(),
          data: [
            {
              iconType: "business-dasao",
              title: "打扫卫生",
              remark: ''
            },
            {
              iconType: "business-chucha",
              title: "出差",
              remark: ''
            }
          ] 
        }
      })
    }
  })
}


