import { IMyApp } from './../../../../../miniprogram-ts/miniprogram/app';
import { ITimelineProps, eventList } from './utils';
import { getTimeLineList } from './../../../comon/api/index'


const app = getApp<IMyApp>();

Page<ITimelineProps, ITimelineProps>({
  data: {
    eventList
  },
  onShow() {
    if (typeof this.getTabBar === 'function') {
        const tabBarCtx = this.getTabBar();
        if(tabBarCtx) {
          // @ts-ignore
          tabBarCtx.setData({
            selected: 2
          })
        }
      }
  },
  onLoad() {
    const { openId } = app.globalData;
    getTimeLineList(openId).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
});