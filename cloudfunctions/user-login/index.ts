import cloud from 'wx-server-sdk';

cloud.init({
  env: "daylio-611ad0"
})

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
