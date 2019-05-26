import cloud from 'wx-server-sdk';


export const main = async (event) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    a: 1,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
