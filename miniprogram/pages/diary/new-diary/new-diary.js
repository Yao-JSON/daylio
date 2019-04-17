import { globalData, getDate } from './../../../utils'

const app = getApp();

console.log(globalData);

Page({
  data: {
    time: null,
    mood: {
      happy: ['happy-daxiao', 'happy-wink'],
      kaixin: ['kaixin-ufo'],
      yiban: ['yiban-headache'],
      bushuang: ['bushuang-karate'],
      chaolan: ['chaolan-kulian']
    }
  },
  onShow() {
    const date = globalData.get('date');
    this.setData({
      time: getDate( date && date.time || new Date()),
    });
  },
  onHide() {
    globalData.set('date', null);
  }
});
