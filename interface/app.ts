export interface IMyApp {
  globalData: {
    backgroundImage: string;
    openId: string | null;
    userInfo: wx.UserInfo | null;
    [propsName: string]: any;
  }
}