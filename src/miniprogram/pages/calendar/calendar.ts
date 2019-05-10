interface ICalendarProps {}

interface ICalendarInstance {}


Page<ICalendarProps, ICalendarInstance>({
  onShow() {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          const tabBarCtx = this.getTabBar();
          if(tabBarCtx) {
            // @ts-ignore
          tabBarCtx.setData({
            selected: 3
          })
        }
      }
  }
})
