import { $wuxToptips } from './../../../wux/index'

Page({
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
    moodList:[
      {
        label: '狂喜',
        level: 5,
        list: [
          {
            iconType: 'business-dasao',
            title: '傻笑',
            remark: 'remark',
            id: 1
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            remark: '备注',
            id: 2
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 3
          }
        ]
      },
      {
        label: '开心',
        level: 4,
        list: [
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 4
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 5
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 6
          }
        ]
      },
      {
        label: '一般',
        level: 3,
        list: [
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 7
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 8
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 9
          }
        ]
      },
      {
        label: '不爽',
        level: 2,
        list: [
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 10
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 11
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 12
          }
        ]
      },
      {
        label: '超烂',
        level: 1,
        list: [
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 13
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 14
          },
          {
            iconType: 'business-dasao',
            title: '傻笑',
            id: 15
          }
        ]
      },
    ]
  },
  handlerDeleteActive(e){
    const { index, groupMoodIndex } = e.currentTarget.dataset;
    const { moodList } = this.data;

    const newMoodList = [...moodList];

    const moodItem = newMoodList[groupMoodIndex];
    moodItem.list.splice(index, 1);
   
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
  }
})