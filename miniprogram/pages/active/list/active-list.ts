import { $wuxToptips } from '../../../wux/index';
import { userActivesKey } from './../../../comon/constant/index';
import { IActiveListItem } from './../../../comon/api/index'


interface IReghtItem {
  text: string;
  style: string;
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

const activeListResult = wx.getStorageSync(userActivesKey);

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
    activeList: activeListResult ? activeListResult.data : []
  },
  onShow() {
    const currentActiveListResult = wx.getStorageSync(userActivesKey);
    if(activeListResult && currentActiveListResult && currentActiveListResult.time !== activeListResult.time ) {
      this.setData({
        activeList: currentActiveListResult.data
      });
    }
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
  }
})