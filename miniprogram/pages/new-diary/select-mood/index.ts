import { IMoodListItem } from './../../mood/utils';
import { $wuxToptips } from '../../../wux/index';
import { getDate, dateFtt } from '../../../comon/utils/index';
import { getMoodsLists } from './../../../comon/api/index';
import { IMoodsListItem, moodsList, levelMood } from './../utils'

import { IMyApp } from './../../../../interface/index'

import { getPickerDay  } from './utils'

const app = getApp<IMyApp>();

const s = 1000;
const m = 60 * s;
const h = 60 * m;

interface ISelectMoodProps {
  jumpMoodEdit: () => void;
}


interface ISelectMoodInstance {
  data: {
    moodsList: IMoodsListItem[];
    diaryTime: number;
    time: {
      date: string;
      time: string;
    },
    datedetail: null | number;
    mood: {
      [propsName: string]: string[];
    },
    years: number[];
    months: number[];
    days: number[];
    visible: boolean;
    pickerValue: number[];
  },
  onLoad: (query) => void;
}

const years: number[] = []
const months: number[] = []


for (let i = 1970; i <= 2100; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}



const getMoodByMoodsResult = (moodsList: IMoodListItem[]): { [propsName: string]: string[] }  => {
  const mood: { [propsName: string]: string[] } = {};

  moodsList.forEach((item) => {
    const { level, list } = item;
    mood[levelMood[level]] = list.map(_ => _.iconType)
  })

  return mood;
};

Page<ISelectMoodProps, ISelectMoodInstance>({
  // @ts-ignore
  data: {
    diaryTime: +new Date(),
    time: {
      date: dateFtt('yyyy-MM-dd'),
      time: dateFtt('hh:mm')
    },
    datedetail: null,
    moodsList,
    mood: {
      happy: ['happy-daxiao', 'happy-wink'],
      kaixin: ['kaixin-ufo'],
      yiban: ['yiban-headache'],
      bushuang: ['bushuang-karate'],
      chaolan: ['chaolan-kulian']
    },
    years,
    months,
    days: getPickerDay(),
    visible: false,
    pickerValue: []
  },
  onLoad(val) {
    const {time, otherDay} = val;

    const dateTime = parseInt(time) || +new Date();
    const datedetail = getDate(dateTime);


    const { days, months, years } = this.data;
        
    if(otherDay) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const pickerValue = [years.indexOf(year), months.indexOf(month), days.indexOf(day)]

      this.setData({
        datedetail,
        visible: true,
        pickerValue,
        days: getPickerDay(year, month)
      });
    } else {
      this.setData({
        datedetail,
      });
    }

    getMoodsLists(app.globalData.openId).then((res) => {
      console.log(res);
      const mood = getMoodByMoodsResult(res);
      this.setData({
        mood
      })
    })
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
    const val = e.detail.value;
    const { time } = this.data;
    
    const [hours, minutes] = time.time.split(':');
    const dete = new Date(val);
    const now = +dete + hours * h + minutes * s;


    this.setData({
      time: {...time, date: val},
      datedetail: getDate(now),
      diaryTime: now,
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
  },
  handlerPopupClose() {
    this.setData({
      visible: false
    })
  },
  handlerPopupPickerChange(e) {
    const { value } = e.detail;
    const yearIndex = value[0];
    const month = value[1] + 1;
    const year = years[yearIndex];

    this.setData({
      pickerValue: value,
      days: getPickerDay(year, month)
    })
  },
  handlerPopupPickerConfirm() {
    const { pickerValue, years, months, days, time } = this.data;

    const yearIndex = pickerValue[0];
    const monthIndex = pickerValue[1];
    const dayIndex = pickerValue[2];

    const year = years[yearIndex];
    const month = months[monthIndex];
    const day = days[dayIndex];
    const [hours, minutes] = time.time.split(':');
    const dateTime = new Date(year, month - 1, day);
    const now = +dateTime + hours * h + minutes * s;
    const date = year + '-' + (month < 10 ? '0' + month : month) + '-' + day;

    this.setData({
      time: {...time, date},
      datedetail: getDate(now),
      diaryTime: now,
      visible: false
    })
  }
});
