import { IMyApp } from './../../../../interface/app';
import { $wuxToptips } from '../../../wux/index';
import { colorLevel, IColorLevelItem, IMoodListItem } from '../utils';
import { getMoodsLists } from '../../../comon/api/mood-api';

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
    // @ts-ignore
    moodList: []
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
    getMoodsLists(app.globalData.openId).then((res) => {
      this.setData({
        moodList: res
      })
    })
  }
});
