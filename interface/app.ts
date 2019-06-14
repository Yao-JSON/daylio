export interface IMyApp {
  globalData: {
    backgroundImage: string;
    openId?: string;
    userInfo: wx.UserInfo | null;
    [propsName: string]: any;
  }
}