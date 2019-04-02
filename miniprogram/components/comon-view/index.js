import baseComponent from './../../wux/helpers/baseComponent';

const app = getApp();

const { SystemInfo } = app.globalData;

import { imageList } from './utils'


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
    imageList
  },
  methods: {
    onLongPress(e) {
      this.setData({
        visible: true
      });
    },
    onClose() {
      this.setData({
        visible: false
      });
    },
    onSelectImage() {

    }
  }
})