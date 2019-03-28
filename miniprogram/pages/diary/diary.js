import { $wuxCalendar } from './../../components/index'

Page({
  data: {
    titmeValue: [],
    list: [
      {
        // 心情: 狂喜
        moodValue: 5,
        moodIcon: "ios-body",
        moodText: "狂喜",
        activity: [{
          id: 1,
          title: '打扫',
          activityIcon: 'ios-body'
        }],
        date: "3月24日 星期日",
        time: "下午 10:04",
        createTime: 1553782664805,
        content: "打扫卫生，打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生"
      },{
        // 心情: 狂喜
        moodValue: 5,
        moodIcon: "ios-body",
        moodText: "狂喜",
        activity: [{
          id: 1,
          title: '打扫',
          activityIcon: 'ios-body'
        }],
        date: "3月24日 星期日",
        time: "下午 10:04",
        createTime: 1553782664805,
        content: "打扫卫生，打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生"
      },
      {
        // 心情: 狂喜
        moodValue: 5,
        moodIcon: "ios-body",
        moodText: "狂喜",
        activity: [],
        date: "3月24日 星期日",
        time: "下午 10:04",
        createTime: 1553782664805,
        content: "打扫卫生，打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生"
      }
    ]
  },
  onShow() {
    if (typeof this.getTabBar === 'function') {
        const tabBarCtx = this.getTabBar();
        if(tabBarCtx) {
          tabBarCtx.setData({
            selected: 0
          })
        }
      }
  }
})
