import { IMyApp } from '../../../../interface/app';
import { $wuxToptips } from '../../../wux/index';
import { colorLevel, IColorLevelItem, IMoodListItem, calcMoodsList, IMoodListItemListItem } from '../utils';
import { deleteMoodsAndCache } from '../../../comon/api/mood-api';

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
    moodList: IMoodListItem[],
    moodListOrigin: IMoodListItemListItem[]
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
    moodList: moodsListInit,
    moodListOrigin: moodsListResult ? moodsListResult.data : []
  },
  handlerDeleteActive(e){
    console.log(e);
    const { groupMoodId  } = e.currentTarget.dataset;
    const { moodListOrigin } = this.data;
    deleteMoodsAndCache(groupMoodId, app.globalData.openId).then(() => {
      const newMoodListOrigin = moodListOrigin.filter((item) => {
        return item._id !== groupMoodId;
      });

      const newMoodList = calcMoodsList(newMoodListOrigin, app.globalData.moodData);

      console.log(newMoodList, newMoodListOrigin);

      this.setData({
        moodListOrigin: newMoodListOrigin,
        newMoodList
      })
    })   
  },
  // 新建心情
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
        moodList: newMoodList,
        moodListOrigin: currentMoodsListResult.data
      })
    }

  }
});
