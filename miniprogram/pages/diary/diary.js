import { $wuxCalendar } from './../../components/index'

Page({
  data: {
    titmeValue: [],
    list: [{
      // 心情: 狂喜
      mood: 5,
      activity: [{
        id: 0,
        text: '打扫'
      }]
    }]
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
