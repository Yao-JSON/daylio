import baseComponent from './../../wux/helpers/baseComponent';

const app = getApp();

const { SystemInfo } = app.globalData;

const backgroundKey = 'diary-global-background-image';

let backgroundSrc = '';

try {
  backgroundSrc = wx.getStorageSync(backgroundKey)
} catch (e) {
  // Do something when catch error
}
console.log(SystemInfo);
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
      value: SystemInfo.screenHeight
    }
  },
  data: {
    visible: false,
    backgroundSrc
  },
  methods: {
    onLongPress(e) {
      if(typeof this.getTabBar === 'function') {
        const cusTabBar = this.getTabBar();
        cusTabBar.onShow({
          onChange: (src) => {
            this.setData({
              backgroundSrc: src
            });
            wx.setStorage({
              key: backgroundKey, 
              data: src
            })
          }
        })
      }
    }
  }
})