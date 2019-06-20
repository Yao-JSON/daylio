export interface IMyApp {
  globalData: {
    backgroundImage: string;
    openId: string | null;
    userInfo: wx.UserInfo | null;
    moodData: any;
    [propsName: string]: any;
  }
}