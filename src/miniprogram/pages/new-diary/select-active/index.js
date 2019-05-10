
import { $wuxToptips } from '../../../wux/index'

Page({
  data: {
    moodIcon: 'happy-wink',
    moodKey: 'happy',
    remark: '',
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
  handlerSelectActive(e) {
    const { dataset } = e.currentTarget;
    const { activeList } = this.data;

    const newActiveList =  activeList.map((item) => {
      if(item.id === dataset.itemId) {
        item.selected = !item.selected;
        return item;
      }
      return item;
    });

    this.setData({
      activeList: newActiveList
    });

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
  handlerTextareaBlur(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  handlerConfirmActive() {
    console.log(this.data);
  },
  onLoad(query) {
   const { diaryTime, moodKey, moodIcon } = query;
   this.setData({
    diaryTime, moodKey, moodIcon
   })
  }
})