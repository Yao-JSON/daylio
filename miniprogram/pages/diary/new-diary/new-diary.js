import { $wuxToptips } from './../../../wux/index'
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
  },
  jumpMoodEdit() {
    wx.navigateTo({
      url: '/pages/mood/list/mood-list',
      fail() {
        $wuxToptips().error({
          hidden: false,
          title: '跳转失败，请稍后重试',
          duration: 3000,
        })
      }
    })
  }
});
