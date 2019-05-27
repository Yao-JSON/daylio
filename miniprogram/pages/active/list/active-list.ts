import { IMyApp } from './../../../../../miniprogram-ts/miniprogram/app';
import { $wuxToptips } from '../../../wux/index'
import { getActiveList } from './../../../comon/api/index'

const app = getApp<IMyApp>();

interface IReghtItem {
  text: string;
  style: string;
}

interface IActiveListItem {
  _id: string;
  iconType: string;
  title: string;
  remark?: string;
}

interface IActiveListProps {
  handlerDeleteActive: (e) => void;
  handlerAddActive: () => void;
}

interface IActiveListInstance {
  data: {
    url: string;
    right: IReghtItem[];
    activeList: IActiveListItem[];
  }
}

Page<IActiveListProps, IActiveListInstance>({
  // @ts-ignore
  data: {
    url: '/pages/active/edit/edit-active',
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
    activeList: []
  },
  handlerDeleteActive(e){
    const { detail, target } = e;
    const { index } = target.dataset;
    const { activeList } = this.data;
    if(detail.index === 1) {
      const newActiveList = [...activeList];
      newActiveList.splice(index, 1)
      this.setData({
        activeList: newActiveList
      });
    }
  },
  // 新建活动
  handlerAddActive() {
    const { url } = this.data;
    wx.navigateTo({
      url,
      fail() {
        $wuxToptips().error({
          hidden: false,
          text: '跳转失败，请稍后重试',
          duration: 3000,
        })
      }
    })
  },
  onShow() {
    getActiveList(app.globalData.openId).then((res) => {
      this.setData({
        activeList: res
      })
    })
  }
})