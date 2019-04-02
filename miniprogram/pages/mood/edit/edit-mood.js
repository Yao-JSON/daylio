// import { $wuxToptips } from './../../../wux/index';
import iconList from './icon-list'

Page({
  data: {
    id: 0,
    iconType: "business-dasao",
    title: '',
    iconList
  },
  // 编辑活动
  handlerChange(e) {
    this.setData({
      title: e.detail.value
    });
  },
  // icon 选择
  handlerSelectIcon(e) {
    const { iconType } = this.data;
    const { dataset } = e.currentTarget;
    this.setData({
      iconType: dataset ? dataset.iconType : iconType
    });
  },
  // 确定
  handlerConfirm() {
    const { id, iconType, title } = this.data;
    console.log(id, iconType, title);

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