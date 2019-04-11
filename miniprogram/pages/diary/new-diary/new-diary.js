import { globalData } from './../../../utils'

const app = getApp();

console.log(globalData);

Page({
  data: {
    time: 0,
  },

  onShow() {
    const date = globalData.get('date');
    if(date) {
      this.setData({
        time: date.time,
      });
    }
  },
  onHide() {
    globalData.set('date', null);
  }
});
