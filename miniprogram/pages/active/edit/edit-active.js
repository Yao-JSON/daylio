import { $wuxToptips } from './../../../wux/index';
import iconList from './icon-list'

Page({
  data: {
    id: 0,
    iconType: "business-dasao",
    title: '',
    iconList
  },
  // 编辑活动
  handlerEditActive() {
    const { id, iconType, title } = this.data;
    
  },
  // 确定
  handlerConfirm() {
    const { id, iconType, title } = this.data;
  },
  onLoad(query) {
    const { id, iconType, title } = query;
    if(!id) {
      wx.setNavigationBarTitle({
        title: "新增活动"
      })
      return;
    }

    this.data.id = id;
    this.data.iconType = iconType;
    this.data.title = title;
    console.log(this.data);
  }
})