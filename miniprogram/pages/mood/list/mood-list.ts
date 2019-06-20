import { IMyApp } from '../../../../interface/app';
import { $wuxToptips } from '../../../wux/index';
import { colorLevel, IColorLevelItem, IMoodListItem, calcMoodsList } from '../utils';
// import { getMoodsLists } from '../../../comon/api/mood-api';

import { userMoodsKey } from './../../../comon/constant/index'

const app = getApp<IMyApp>();

interface IMoodListProps {
  handlerDeleteActive: (e) => void;
  handlerAddActive: () => void;
};
interface IMoodListInstance {
  data: {
    url: string;
    right: any;
    colorLevel: IColorLevelItem[];
    moodList: IMoodListItem[]
  }
}

const moodsListResult = wx.getStorageSync(userMoodsKey);

console.log(moodsListResult);



const moodsListInit = moodsListResult ? calcMoodsList(moodsListResult.data, app.globalData.moodData) : [];

console.log(moodsListInit);

Page<IMoodListProps, IMoodListInstance>({
  // @ts-ignore
  data: {
    url: '/pages/mood/edit/edit-mood',
    right: [
      {
        text: '取消',
        style: 'background-color: #ddd; color: white',
      },
      {
        text: '删除',
        style: 'background-color: #F4333C; color: white',
      }
    ],
    colorLevel,
    moodList: moodsListInit
  },
  handlerDeleteActive(e){
    const { index, groupMoodIndex } = e.currentTarget.dataset;
    const { moodList } = this.data;

    const newMoodList = [...moodList];

    const moodItem = newMoodList[groupMoodIndex];
    moodItem.list.splice(index, 1);
   
    // @ts-ignore
    this.setData({
      moodList: newMoodList
    });
   
  },
  // 新建活动
  handlerAddActive() {
    const { url } = this.data;
    wx.navigateTo({
      url,
      fail() {
        $wuxToptips().error({
          hidden: false,
          title: '跳转失败，请稍后重试',
          duration: 3000,
        })
      }
    })
  },
  onShow() {
    const currentMoodsListResult = wx.getStorageSync(userMoodsKey);

    if(currentMoodsListResult.time !== moodsListResult.time) {
      const newMoodList = calcMoodsList(currentMoodsListResult.data, app.globalData.moodData);
      this.setData({
        moodList: newMoodList
      })
    }

  }
});
