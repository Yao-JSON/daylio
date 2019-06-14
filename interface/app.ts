export interface IMyApp {
  globalData: {
    backgroundImage: string;
    openId?: string;
    userInfo: wx.UserInfo | null;
    phoneNumber: number| null;
    [propsName: string]: any;
  }
}