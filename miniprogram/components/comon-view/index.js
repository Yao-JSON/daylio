import baseComponent from './../../wux/helpers/baseComponent';

const app = getApp();
const { SystemInfo, navRect, backgroundImage } = app.globalData;

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
            app.globalData.backgroundImage = src;
          }
        })
      }
    }
  },
  pageLifetimes: {
    show() {
      const newApp = getApp();
      const { backgroundImage } = newApp.globalData;
      this.setData({
        backgroundImage
      })
    }
  }
})