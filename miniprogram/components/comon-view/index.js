import baseComponent from './../../wux/helpers/baseComponent';

const app = getApp();
const { SystemInfo, navRect } = app.globalData;
const backgroundKey = 'diary-global-background-image';
let backgroundImage = '';

try {
  backgroundImage = wx.getStorageSync(backgroundKey)
} catch (e) {
  // Do something when catch error
  backgroundImage = "https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165500-106393e0-47be-435a-b835-861da84ce2a8.jpeg"
}

console.log(SystemInfo, navRect);

const screenHeight = SystemInfo.screenHeight - navRect.bottom;

baseComponent({
  properties:{
    isHasCustomBar: {
      type: Boolean,
      value: false
    },
    windowHeight: {
      type: Number,
      value: SystemInfo.windowHeight
    },
    screenHeight: {
      type: Number,
      value: screenHeight
    }
  },
  data: {
    visible: false,
    backgroundImage
  },
  methods: {
    onLongPress(e) {
      if(typeof this.getTabBar === 'function') {
        const cusTabBar = this.getTabBar();
        cusTabBar.onShow({
          onChange: (src) => {
            this.setData({
              backgroundImage: src
            });
            wx.setStorage({
              key: backgroundKey, 
              data: src
            })
          }
        })
      }
    }
  },
  lifetimes: {
    attached() {
      const currentPage = getCurrentPages();
      console.log('currentPage', currentPage);
    }
  }
})