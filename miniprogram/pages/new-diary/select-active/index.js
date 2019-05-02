
import { $wuxToptips } from '../../../wux/index'

Page({
  data: {
    moodIcon: 'happy-wink',
    moodKey: 'happy',
    selectActive: [1,2],
    activeList: [
      {
        activeIcon:"business-dasao",
        title: "工作",
        id: 1,
      },
      {
        activeIcon:"business-chanpin",
        title: "休息",
        id: 2,
      },
      {
        activeIcon:"business-chucha",
        title: "约会",
        id: 3,
      },
      {
        activeIcon:"business-zuzhijiagou",
        title: "工作",
        id: 4,
      },
      {
        activeIcon:"business-chanpin",
        title: "休息",
        id: 5,
      },
      {
        activeIcon:"business-baoxiao",
        title: "约会",
        id: 6,
      },
      {
        activeIcon:"business-dianhua",
        title: "工作",
        id: 7,
      },
      {
        activeIcon:"business-caigou",
        title: "休息",
        id: 8,
      },
      {
        activeIcon:"business-gongzuo",
        title: "约会",
        id: 9,
      },
    ],
  },
  selectActive() {
    
  },
  jumpActiveList() {
    wx.navigateTo({
      url: '/pages/active/list/active-list',
      fail() {
        $wuxToptips().error({
          hidden: false,
          title: '跳转失败，请稍后重试',
          duration: 3000,
        })
      }
    })
  },
  onLoad(query) {
    const { id, iconType, title } = query;
    if(!id) {
      wx.setNavigationBarTitle({
        title: "新增活动"
      })
      return;
    }

    this.setData({
      id,
      iconType,
      title 
    })
  }
})