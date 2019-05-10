import { globalData, backgroundImageList } from './../comon/utils';
import baseComponent from './../miniprogram/wux/helpers/baseComponent';

console.log(baseComponent);

interface IComponentInstance {
  data: {
    selected: number;
  }
}

baseComponent<IComponentInstance, IComponentInstance>({
  useFunc: true,
  options: {
    addGlobalClass: true,
  },
  // @ts-ignore
  data: {
    selected: 2,
    list: [
      {
        "pagePath": "/pages/diary/list/diary",
        "text": "日记",
        "icon": "ios-paper",
        "iconFill": "ios-paper",
        "action": "switchTab"
      },
      {
        "pagePath": "/pages/chart/chart",
        "text": "报表",
        "icon": "ios-stats",
        "iconFill": "ios-stats",
        "action": "switchTab"
      },
      {
        "type": "button",
        "text": "发布 ",
        "className": "shadow",
        "action": "switchTab"
      },
      {
        "pagePath": "/pages/calendar/calendar",
        "text": "日历",
        "icon": 'ios-calendar',
        "iconFill": 'ios-calendar',
        "action": "switchTab"
      },
      {
        "pagePath": "/pages/about/about",
        "text": "我的",
        "action": "switchTab",
        "icon": "ios-person",
        "iconFill": "ios-person"
      }
    ],
    visible: false,
    imageList: [...backgroundImageList, null],
    onChange() {},
    buttons: [
      {
        label: "昨天",
      },
      {
        label: "今天"
      },
      {
        label: "其他日期"
      }
    ]
  },
  methods: {
    // @ts-ignore
    switchTab(e) {      
      const { url } = e.currentTarget.dataset;
      if(url) {
        wx.switchTab({
          url
        })
      }
    },
    onClose() {
      // @ts-ignore
      this.setData({
        visible: false
      })
    },
    onShow(opts = { }) {      
      // @ts-ignore
      const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, this.data, opts));
      // @ts-ignore
      this.$$setData({ ...options }).then(() => {
        // @ts-ignore
        this.setData({
          visible: true
        })
      })
    },
    // @ts-ignore
    onImageSelect(e) {
      const { dataset } = e.currentTarget;
      // @ts-ignore
      if(this.fns.onChange && typeof this.fns.onChange === 'function') {
        // @ts-ignore
        this.fns.onChange.call(this, dataset.src);
      }
    },
    // @ts-ignore
    onNewDiary(e) {
      const { index } = e.detail;
      // 昨天 今天
      if(index === 0 || index === 1) {
        const today = new Date().getTime();
        const lastDay = today - 86400000;
        const url = '/pages/new-diary/select-mood/index';
        
        globalData.set('date', {
          index,
          time: index === 0 ? lastDay : today
        });

        wx.navigateTo({
          url,
          fail(e) {
            console.log(e);
          }
        })
        return;
      }
    }
  },
})
