import { IMyApp } from './../../../../interface/app';
import { $wuxToptips, $wuxToast } from '../../../wux/index'
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
    isSpinning: false
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

    if(!selectedActive.length) {
      $wuxToast().show({
        type: 'cancel',
        duration: 1500,
        color: '#fff',
        text: '请选择活动',
      });
      return;
    }

    this.setData({
      isSpinning: true
    })
    console.log(params);
    console.log(this.data);
    addOrUpdateEvent(params, openId).then(() => {
      this.setData({
        isSpinning: false
      });

      $wuxToast().show({
        type: 'success',
        duration: 1500,
        color: '#fff',
        text: '创建成功',
        success: () => {
          wx.switchTab({
            url: "/pages/diary/timeline/index"
          });
        }
      });
    }).catch(() => {
      $wuxToast().show({
        type: 'cancel',
        duration: 1500,
        color: '#fff',
        text: '保存失败',
        success: () => console.log('保存失败')
      });
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
  onLoad(query) {
    // @ts-ignore
   const { diaryTime = new Date(), moodKey = "happy", moodIcon ="happy-wink" } = query || {};
   this.setData({
    diaryTime, moodKey, moodIcon
   });
   this.handlerLoadingActive();
  },
  handlerLoadingActive() {
    const { openId } = app.globalData;
    getActiveList(openId).then((res) => {
     console.log(res);
     this.setData({
       activeList: res
     })
    })
  }

})