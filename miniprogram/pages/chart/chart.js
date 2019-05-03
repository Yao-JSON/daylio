const app = getApp();
Page({
  data: {
    tabs: [
      {
        key: 0,
        title: '分类'
      },
      {
        key: 1,
        title: '趋势',
      },
      {
        key: 2,
        title: '对比',
      },
    ],
    tabKey: 0
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onTabsChange(e) {
    const { key } = e.detail;
    this.setData({
      tabKey: key,
    })
  },
  onSwiperChange(e) {
    const { current } = e.detail;
    this.setData({
      tabKey: current
    })
  }
});
