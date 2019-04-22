import { $wuxToptips } from './../../../wux/index'
import { globalData, getDate } from './../../../utils'

const app = getApp();

console.log(globalData);

Page({
  data: {
    time: null,
    moods:[
      {
        key: 'happy',
        mood: ['happy-daxiao', 'happy-wink'],
        text: '狂喜'
      },
      {
        key: 'kaixin',
        mood: ['kaixin-ufo'],
        text: '开心'
      },
      {
        key: 'yiban',
        mood: ['yiban-headache'],
        text: '一般'
      },
      {
        key: 'bushuang',
        mood: ['bushuang-karate'],
        text: '不爽'
      },
      {
        key: 'chaolan',
        mood: ['chaolan-kulian'],
        text: '超烂'
      }
    ],
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
  },
  DatePickerChange(e) {
    const val = e.detail.value;
    const dete = new Date(val);
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = +dete + hours * minutes * seconds * 1000;

    this.setData({
      time: getDate(time)
    })
  },
  newDiaryActive(e) {
    console.log(e);
  }
});
