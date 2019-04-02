import baseComponent from './../../wux/helpers/baseComponent';

const app = getApp();

const { SystemInfo } = app.globalData;

baseComponent({
  properties:{
    isHasCustomBar: {
      type: Boolean,
      value: false
    },
    windowHeight: {
      type: Number,
      value: SystemInfo.windowHeight
    }
  },
  data: {
    visible: false,
    backgroundSrc: ''
  },
  methods: {
    onLongPress(e) {
      if(typeof this.getTabBar === 'function') {
        const cusTabBar = this.getTabBar();
        cusTabBar.onShow({
          onChange: (src) => {
            this.setData({
              backgroundSrc: src
            })
          }
        })
      }
    }
  }
})