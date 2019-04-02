import baseComponent from './../../wux/helpers/baseComponent';

const app = getApp();

const { SystemInfo } = app.globalData;

console.log(JSON.stringify(app.globalData.SystemInfo, null , 2));

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
    popupPaddingBottom: {
      type: Number,
      value: SystemInfo.screenHeight - SystemInfo.windowWidth,
    }
  },
  data: {
    visible: false
  },
  methods: {
    onLongPress(e) {
      console.log('onLongPress', e);
      this.setData({
        visible: true
      });
    }
  }
})