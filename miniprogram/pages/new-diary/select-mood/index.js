import { $wuxToptips } from '../../../wux/index'
import { globalData, getDate, dateFtt } from '../../../utils'

const s = 1000;
const m = 60 * s;
const h = 60 * m;

Page({
  data: {
    diaryTime: +new Date(),
    time: {
      date: dateFtt('yyyy-MM-dd'),
      time: dateFtt('hh:mm')
    },
    datedetail: null,
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
      datedetail: getDate( date && date.time || new Date()),
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
  datePickerChange(e) {
    console.log(e);
    const val = e.detail.value;
    const { time } = this.data;

    const [hours, minutes] = time.time.split(':');
    const dete = new Date(val);
    const now = +dete + hours * h + minutes * s;

    this.setData({
      time: {...time, date: val},
      datedetail: getDate(now),
      diaryTime: now
    })
  },
  timePickerChange(e) {
    const val = e.detail.value;
    const { time } = this.data;
    const [hours, minutes] = val.split(':');
    const dete = new Date(time.date);
    const now = +dete + hours * h + minutes * s;
    this.setData({
      time: {...time, time: val},
      datedetail: getDate(now),
      diaryTime: now
    });
  },
  newDiaryActive(e) {
    const { dataset } = e.currentTarget
    const { diaryTime } = this.data;
    wx.navigateTo({
      url: '/pages/new-diary/select-active/index?diaryTime='+diaryTime + '&moodKey='+ dataset.moodKey + '&moodIcon='+ dataset.moodIcon,
    })
  }
});
