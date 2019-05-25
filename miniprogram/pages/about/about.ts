import { IMyApp } from './../../../interface'
const userInfoKey = "diary-userinfo-global-key";
const app = getApp<IMyApp>();

interface IActionDataItem {
  title: string;
  actionIcon: string;
  textColor?: string;
  url?:string; 
}

interface IAboutDataProps {
  data: {
    hasUserInfo?: boolean;
    day?: number;
    userInfo?: Record<string, any>,
    targetDay?: number,
    actionData?: IActionDataItem[][]
  },
  getUserInfo: () => void
}

const { userInfo } = app.globalData;

Page<IAboutDataProps, IAboutDataProps>({
  // @ts-ignore
  data: {
    hasUserInfo: !!userInfo,
    userInfo,
    day: 2,
    targetDay: 7,
    actionData: [
      [
        {
          title: '结绳社区',
          actionIcon: 'logo-apple',
          textColor: '#0081ff'
        },
        {
          title: "心情管理",
          actionIcon: "ios-sunny",
          textColor: "#e54d42",
          url: "/pages/mood/list/mood-list"
        },
        {
          title: "活动管理",
          actionIcon: "ios-wine",
          textColor: "#9c26b0",
          url: "/pages/mood/list/mood-list"
        }
      ],
      [
        {
          title: '主题皮肤',
          actionIcon: 'ios-shirt',
          textColor: '#1cbbb4'
        },
        {
          title: '提醒',
          actionIcon: 'ios-megaphone',
          textColor: '#39b54a'
        }
      ],
      [
        {
          title: '设置',
          actionIcon: 'ios-cog',
        },
        {
          title: '用户反馈',
          actionIcon: 'ios-rocket',
        },
        {
          title: '关于我们',
          actionIcon: 'ios-school',
        }
      ]
    ]
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 4
        })
      }
  },
  getUserInfo() {
    wx.getUserInfo({
      success:(res) => {
        const { userInfo } = res;
        const now = new Date().getTime();
        try {
          wx.setStorageSync(userInfoKey, {time: now, data: userInfo})
        } catch(e) {
          console.error(e);
        }
        this.setData({
          userInfo,
          hasUserInfo: true
        })
      }
    });
  },
  onJump(e) {
    const { url } = e.currentTarget.dataset;
    if(url) {
      wx.navigateTo({
        url
      })
    }
  }
})

