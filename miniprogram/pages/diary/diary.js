import { $wuxCalendar } from './../../components/index'

Page({
  data: {
    titmeValue: []
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
  }
})
