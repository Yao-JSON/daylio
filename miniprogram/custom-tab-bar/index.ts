import { backgroundImageList } from '../comon/utils/index';
import baseComponent from '../wux/helpers/baseComponent';


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
    selected: 0,
    // @ts-ignore
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
        "text": "记录",
        "className": "shadow",
        "icon": 'ios-add-circle-outline',
        "iconFill": "ios-add",
        "action": "switchTab",
        "pagePath": "/pages/diary/timeline/index"
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
      const url = '/pages/new-diary/select-mood/index';
      const today = new Date().getTime();
      const lastDay = today - 86400000;

      let query = '?';

      // 昨天
      if(index === 0) {
        // globalData.set('date', {
        //   index,
        //   time: lastDay
        // })
        query += 'time=' + lastDay;
      }
      // 今天
      if(index === 1) {
        // globalData.set('date', {
        //   index,
        //   time: today
        // })
        query += 'time=' + today;
      }
      
      if(index === 2) {
        query += 'time=' + today + '&otherDay=' + 1;
      }
    
      wx.navigateTo({
        url: url + query,
        fail(e) {
          console.log(e);
        }
      })

      console.log(index);
    }
  },
})
