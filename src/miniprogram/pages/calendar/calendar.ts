
interface ICalendarInstance {
  data: {
    weeks: string[]
  }
}
interface ICalendarProps {
}


enum weekText {
  "日" = 0,
  "一" = 1,
  '二' = 2,
  '三' = 3,
  '四' = 4,
  '五' = 5,
  '六' = 6
}

Page<ICalendarProps, ICalendarInstance>({
  data: {
    weeks: ['一', '二', '三', '四','五','六', '日']
  },
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
