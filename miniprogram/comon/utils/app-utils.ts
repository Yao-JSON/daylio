// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

import { appAndOpenIdKey,  systemInfoKey, userInfoKey, isInitedKey } from './../../comon/constant/index'
import {
  diaryMoods,
  diaryActives,
  activesItem
} from './constance';


const s = 1000;
const m = 60 * s;
const h = 60 * m;
const day = h * 24;
const week = day * 7;

interface IBaseMoodsItem {
  level: number;
  title: string;
  remark: string;
  iconType: string;
}

interface IBaseActivesItem {
  title: string;
  iconType: string;
  remark: string;
}

const baseMoods: IBaseMoodsItem[] = [{
  title: '狂喜',
  level: 5,
  remark: '系统默认',
  iconType: 'happy-daxiao'
}, {
  title: '开心',
  level: 4,
  remark: '系统默认',
  iconType: 'kaixin-ufo'
},{
  title: "一般",
  level: 3,
  iconType: 'yiban-headache',
  remark: '系统默认'
}, {
  title: '不爽',
  level: 2,
  remark: '系统默认',
  iconType: 'bushuang-karate'
}, {
  title: '超烂',
  level: 1,
  iconType: 'chaolan-kulian',
  remark: '系统默认'
}];


const baseActives: IBaseActivesItem[] = [
  {
    title: "工作",
    iconType: 'business-gongzuo',
    remark: ''
  },
  {
    title: "休息",
    iconType: 'lvyou-jingdian',
    remark: ''
  },
  {
    title: "就餐",
    iconType: 'lvyou-canyin',
    remark: ''
  },
  {
    title: "购物",
    iconType: 'lvyou-gouwu',
    remark: ''
  },
]

export const appOnLaunch = (app) => {
  const now = new Date().getTime();
  // 查找 userInfo
  try {
    const userInfo = wx.getStorageSync(userInfoKey);
    app.globalData.userInfo = userInfo || null;
  } catch(e) {
    console.error('获取 userInfo',e);
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
    console.error('查找设备信息',e);
  }

   // openId
   try {
    const openInfo = wx.getStorageSync(appAndOpenIdKey);
    if(openInfo && openInfo.time && now - openInfo.time <= week) {
      const { openId, appId } = openInfo.data;
      app.globalData.openId = openId;
      app.globalData.appId = appId;
    }
   } catch(e) {
    console.error('获取 opeind', e)
   }
}

export const initMoods = async () => {
  const db = wx.cloud.database();
  const diaryMoodsCol = db.collection(diaryMoods);
  
  const now = new Date().getTime();
  const result: Array<string | number> = [];

  for (let i = 0; i < baseMoods.length; i ++) {
    const item = baseMoods[i];
    const addResult = await diaryMoodsCol.add({
      data: {
        ...item,
        createTime: now,
        updateTime: now
      }
    })
    result.push(addResult._id);
  }

  return result;
}

export const initActives = async () => {
  const db = wx.cloud.database();
  const diaryActivesCol = db.collection(diaryActives);
  const now = new Date().getTime();
  const result: Array<string | number> = [];
  for (let i = 0; i < baseActives.length; i ++) {
    const item = baseActives[i];
    const addResult = await diaryActivesCol.add({
      data: {
        ...item,
        createTime: now,
        updateTime: now
      }
    })
    result.push(addResult._id);
  }
  return result;
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


export const appInit = async (app) => {
  const { openId } = app.globalData;
  if(!openId) {
    const useLogin = await wx.cloud.callFunction({
      name: 'user-login',
      data: {}
    });

    const now = new Date().getTime();
    // @ts-ignore
    const { appId, openId } = useLogin.result;
    app.globalData.openId = openId;
    app.globalData.appId = appId;
    wx.setStorageSync(appAndOpenIdKey, {time: now, data: {openId, appId}});
  };

  let isInit = false;

  try {
    isInit = wx.getStorageSync(isInitedKey);
  } catch(e) {
    console.error('isInited', e);
  }

  if(!isInit) {
    const initMoodsResult = await initMoods();
    const initActivesResult = await initActives();
  }

}
 

