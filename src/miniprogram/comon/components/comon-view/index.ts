import baseComponent from './../../../wux/helpers/baseComponent';
import { IMyApp } from '../../../../interface'

const app = getApp<IMyApp>();
const { SystemInfo, navRect, backgroundImage } = app.globalData;

const screenHeight = SystemInfo.screenHeight - navRect.bottom;


interface IComponentInstance {
  externalClasses: string[];
}

baseComponent<IComponentInstance, IComponentInstance>({
  externalClasses: ['wux-class'],
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
    backgroundImage,
  },
  methods: {
    onLongPress() {
      // @ts-ignore
      if(typeof this.getTabBar === 'function') {
        // @ts-ignore
        const cusTabBar = this.getTabBar();
        if(cusTabBar) {
          cusTabBar.onShow({
            // @ts-ignore
            onChange: (src) => {
              // @ts-ignore
              this.setData({
                backgroundImage: src
              });
              app.globalData.backgroundImage = src;
            }
          })
        }
      }
    }
  },
  pageLifetimes: {
    show() {
      const newApp = getApp<IMyApp>();
      const { backgroundImage } = newApp.globalData;
      // @ts-ignore
      this.setData({
        backgroundImage
      })
    }
  }
})