// @ts-ignore
const cloud = require('wx-server-sdk');

// 初始化 cloud

if(cloud) 
cloud.init()


export const main = async (event) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openId: wxContext.OPENID,
    appId: wxContext.APPID,
    unionId: wxContext.UNIONID,
  }
}
