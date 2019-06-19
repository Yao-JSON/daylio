import { IMyApp } from './../../../../interface/app';
import { $wuxToptips } from '../../../wux/index'
import { addOrUpdateEvent, IAddOrUpdateEventParams, getActiveList, IActiveListItem } from './../../../comon/api/index';


interface IActiveListProps {
  handlerSelectActive: (e) => void;
  jumpActiveList: () => void;
}


interface INewActiveListItem extends IActiveListItem {
  selected?: boolean;
}

interface IActiveListParams {
  data: {
    activeList: INewActiveListItem[];
    moodIcon: string;
    moodKey: string;
    remark: string;
    activeImage: string | null;
    [props:string]: any;
  },
  onLoad: (query:Record<string, any>) => void;
}


const app = getApp<IMyApp>();

Page<IActiveListProps, IActiveListParams>({
  // @ts-ignore
  data: {
    moodIcon: 'happy-wink',
    moodKey: 'happy',
    remark: '',
    activeList: [],
    activeImage: null,
    address: null,
    placeName: null,
    latitude: null,
    longitude: null,
  },
  handlerSelectActive(e) {
    const { dataset } = e.currentTarget;
    const { activeList } = this.data;

    const newActiveList =  activeList.map((item) => {
      if(item._id === dataset.itemId) {
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
    const { activeImage, remark, moodKey, address, diaryTime, latitude = null, longitude = null, activeList } = this.data;
    const { openId } = app.globalData;
    const selectedActive = activeList.filter(_ => !!_.selected).map(_ => _._id);

    const params: IAddOrUpdateEventParams = {
      activeListIds: selectedActive,
      remark,
      moodKey,
      address,
      diaryTime,
      latitude,
      longitude,
      filePath: activeImage
    };

    console.log(params);
    console.log(this.data);
    return;
    addOrUpdateEvent(params, openId).then((res) => {
      console.log(res);
    })

  },
  chooseAddress() {
    wx.chooseLocation({
      success: (res) => {
        console.log(res);
        const { longitude, latitude, name, address } = res;
        this.setData({
          longitude,
          latitude,
          address,
          placeName: name
        })
      }
    })
  },
  handlerChooseImage() {
    wx.chooseImage({
      success:(res) =>{
        const filePath = res.tempFilePaths[0]
        this.setData({
          activeImage: filePath
        })
      }
    })
  },
  onShow() {
    const { openId } = app.globalData;

    getActiveList(openId).then((res) => {
     console.log(res);
     this.setData({
       activeList: res
     })
    })
  },
  onLoad(query) {
    // @ts-ignore
   const { diaryTime = new Date(), moodKey = "happy", moodIcon ="happy-wink" } = query || {};
   this.setData({
    diaryTime, moodKey, moodIcon
   });
  }
})