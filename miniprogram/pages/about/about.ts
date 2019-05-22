const app = getApp();

interface IActionDataItem {
  title: string;
  actionIcon: string;
  textColor?: string;
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

Page<IAboutDataProps, IAboutDataProps>({
  // @ts-ignore
  data: {
    hasUserInfo: false,
    userInfo: {},
    day: 2,
    targetDay: 7,
    actionData: [
      [
        {
          title: '结绳社区',
          actionIcon: 'logo-apple',
          textColor: '#0081ff'
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
        this.setData({
          userInfo,
          hasUserInfo: true
        })
      }
    });
  }
})

