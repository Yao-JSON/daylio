// import { $wuxToptips } from './../../../wux/index';
import iconList from './icon-list'

import { colorLevel } from './../utils'

Page({
  data: {
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    id: 0,
    iconType: "happy-daxiao",
    title: '',
    iconList,
    moodLevel: 5,
    moodLevelColorType: 'happy',
    colorLevel
  },
  // 编辑心情
  handlerChange(e) {
    this.setData({
      title: e.detail.value
    });
  },
  // icon 选择
  handlerSelectIcon(e) {
    const { iconType, moodLevelColorType, moodLevel } = this.data;
    const { dataset } = e.currentTarget;
    this.setData({
      iconType: dataset && dataset.iconType ? dataset.iconType : iconType,
      moodLevelColorType: dataset && dataset.moodLevelColorType ? dataset.moodLevelColorType : moodLevelColorType,
      moodLevel: dataset && dataset.moodLevel ? dataset.moodLevel : moodLevel
    });
  },
  // 确定
  handlerConfirm() {
    const { id, iconType, title, moodLevel } = this.data;
    console.log(id, iconType, title, moodLevel);

  },
  onLoad(query) {
    const { id, iconType, title, level } = query;
    if(!id) {
      wx.setNavigationBarTitle({
        title: "新增心情"
      })
      return;
    }

    this.setData({
      id,
      iconType,
      title,
      levelColorType: level ? colorLevel[level].levelColorType : 'happy'
    })
  }
})