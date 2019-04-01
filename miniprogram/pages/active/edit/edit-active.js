import { $wuxToptips } from './../../../wux/index'

Page({
  data: {
    url: '/pages/edit-mood/edit-mood',
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
    activeList: [
      {
        "icon": "dasao",
        "title": "打扫卫生"
      },
      {
        "icon": "chanpin",
        "title": "打扫卫生"
      },
      {
        "icon": "chucha",
        "title": "打扫卫生"
      },
      {
        "icon": "dianhua",
        "title": "打扫卫生"
      },
    ]
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