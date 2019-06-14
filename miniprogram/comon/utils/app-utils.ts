// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

import { userInfoKey, appAndOpenId,  systemInfoKey, phoneNumberKey} from './../../comon/constant/index'


import {
  diaryUsers,
  diaryMoods,
  moodsBushuang,
  moodsChaolan,
  moodsHappy,
  moodsYiban,
  moodsKaixin,
  diaryActives,
  activesItem
} from './constance'

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
    app.globalData.userInfo = userInfo || null;
  }catch(e) {
    console.error(e);
  }

  // 获取用户手机号
  try {
    const usePhoneNumber = wx.getStorageSync(phoneNumberKey);
    app.globalData.phoneNumber  = usePhoneNumber || null;
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
      if(!openInfo && openInfo.time && now - openInfo.time <= week) {
        const { openId, appId } = openInfo.data;
        app.globalData.openId = openId;
        app.globalData.appId = appId;
        resolve(app.globalData)
      } else {
        wx.cloud.callFunction({
          name: 'user-login',
          data: {}
        }).then((res) => {
          console.log(res);
          // @ts-ignore
          const { openId, appId } = res.result;
          app.globalData.openId = openId;
          app.globalData.appId = appId;
          try {
            wx.setStorageSync(appAndOpenId, {time: now, data: {openId, appId}});
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
  const _ = db.command
  const diaryUserdsCol = db.collection(diaryUsers);
  return new Promise((resolve) => {
    diaryUserdsCol.doc(openId).get({
      fail() {
        diaryUserdsCol.add({
          data: {
            _id: openId,
            index: _.inc(1),
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

export const initMoods = async ({openId, colName, iconType, title}): Promise<(string)[]> => {
  
  const db = wx.cloud.database();
  const _ = db.command
  const col = db.collection(colName);
  const moodsResult = await col.where({_openid: openId}).get();
  const { data } = moodsResult;
  
  if(!data.length) {
    const result = await col.add({
      data: {
        iconType,
        title,
        index: _.inc(1),
        createTime: new Date().getTime(),
        updateTime: new Date().getTime(),
      }
    })
    // @ts-ignore
    return [result._id]
  } else {
    // @ts-ignore
    return data.filter(_ => !!_._id).map(_ => _._id)
  }
};

export const initUserMoods = async (openId) => {
  const db = wx.cloud.database();
  const _ = db.command
  const diaryMoodsCol = db.collection(diaryMoods);
  const now = new Date().getTime();

  const diaryMoodsColResult = await diaryMoodsCol.doc(openId).get().then((res) => {
    const { data, errMsg } = res;
    return {
      data,
      errMsg
    }
  }).catch((err) => {
    return {
      errMsg: err,
      data: null
    }
  });
  const { data } = diaryMoodsColResult;

  if(!data) {
    // 初始化心情
    const happyIds = await initMoods({openId, colName: moodsHappy, iconType: 'happy-daxiao', title: '大笑'});
    const kaixinIds = await initMoods({openId, colName: moodsKaixin, iconType: 'kaixin-quiet', title: '开心'});
    const yibanIds = await initMoods({openId, colName: moodsYiban, iconType: 'yiban-headache', title: '一般'});
    const bushuangIds = await initMoods({openId, colName: moodsBushuang, iconType: 'bushuang-layer', title: '伤心'});
    const chaolanIds = await initMoods({openId, colName: moodsChaolan, iconType: 'chaolan-kulian', title: '流泪'});

    await diaryMoodsCol.add({
      data: {
        _id: openId,
        index: _.inc(1),
        createTime: now,
        updateTime: now,
        data: {
          happy: {
            list: happyIds,
            level: 5,
            label: "狂喜"
          },
          kaixin: {
            list: kaixinIds,
            level: 4,
            label: "开心"
          },
          yiban: {
            list: yibanIds,
            level: 3,
            label: "一般"
          },
          bushuang: {
            list: bushuangIds,
            level: 2,
            label: "不爽"
          },
          chaolan: {
            list: chaolanIds,
            level: 1,
            label: "超烂"
          },
        }
      }
    })
  }
}
export const initUserActives = async (openId) => {
  const db = wx.cloud.database();
  const diaryActivesCol = db.collection(diaryActives);
  const activesItemCol = db.collection(activesItem);
  const result = await diaryActivesCol.doc(openId).get().catch((err) => {return { data: null, errMsg: err }});
  const { data } = result;

  const now = new Date().getTime();

  if(!data) {
    const activesItemResult = await activesItemCol.add({
      data: {
        iconType: "business-dasao",
        title: "打扫卫生",
        remark: '',
        createTime: now,
        updateTime: now,
      },
    });

    await diaryActivesCol.add({
      data: {
        _id: openId,
        createTime: now,
        updateTime: now,
        ids:[activesItemResult._id]
      }
    });
  }
}


