
import { $wuxToptips } from '../../../wux/index'

import { activeList, IActiveListItem } from './../utils'


interface IActiveListProps {
  handlerSelectActive: (e) => void;
  jumpActiveList: () => void;
}

interface IActiveListParams {
  data: {
    activeList: IActiveListItem[];
    moodIcon: string;
    moodKey: string;
    remark: string;
  },
  onLoad: (query:Record<string, any>) => void;
}


Page<IActiveListProps, IActiveListParams>({
  // @ts-ignore
  data: {
    moodIcon: 'happy-wink',
    moodKey: 'happy',
    remark: '',
    activeList,
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