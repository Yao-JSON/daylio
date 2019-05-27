import { IMyApp } from '../../../../interface';
import iconList, {IActiveItem} from './icon-list'

import { addOrUpdateActive } from './../../../comon/api/index'

const app = getApp<IMyApp>();

interface IEditActiveProps {
  handlerChange: (e) => void;
  handlerSelectIcon: (e) => void;
  handlerConfirm: () => void;
}

interface IEditActiveInstance {
  data: {
    id: string,
    iconType: string,
    title: string,
    iconList: IActiveItem[]
  },
  onLoad: (query: { [queryKey: string]: string }) => void;
}


Page<IEditActiveProps, IEditActiveInstance>({
  // @ts-ignore
  data: {
    id: '',
    iconType: "business-dasao",
    title: '',
    iconList
  },
  // 编辑活动
  handlerChange(e) {
    // @ts-ignore
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

    addOrUpdateActive({ id, iconType, title }, app.globalData.openId)


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