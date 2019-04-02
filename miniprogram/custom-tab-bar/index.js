import { imageList } from './utils'

import baseComponent from './../wux/helpers/baseComponent'


baseComponent({
  useFunc: true,
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [{
        "pagePath": "/pages/diary/list/diary",
        "text": "日记",
        "icon": 'icon-homefill',
        "action": "switchTab"
      },
      {
        "pagePath": "/pages/chart/chart",
        "text": "统计",
        "icon": "icon-similar",
        "action": "switchTab"
      },
      {
        "type": "button",
        "pagePath": "/pages/diary/new-diary/new-diary",
        "text": "发布 ",
        "className": "shadow",
        "action": "switchTab",
        "icon": "icon-add "
      },
      {
        "pagePath": "/pages/calendar/calendar",
        "text": "日历",
        "icon": 'icon-cart',
        "action": "switchTab"
      },
      {
        "pagePath": "/pages/about/about",
        "text": "我的",
        "action": "switchTab",
        "icon": "icon-my"
      }
    ],
    visible: false,
    imageList,
    onChange() {}
  },
  methods: {
    switchTab(e) {      
      const { url } = e.currentTarget.dataset;
      if(url) {
        wx.switchTab({
          url
        })
      }
    },
    onClose() {
      this.setData({
        visible: false
      })
    },
    onShow(opts = { }) {      
      const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, this.data, opts));
      this.$$setData({ ...options }).then(() => {
        this.setData({
          visible: true
        })
      })
    },
    onImageSelect(e) {
      const { dataset } = e.currentTarget;
      if(this.fns.onChange && typeof this.fns.onChange === 'function') {
        this.fns.onChange.call(this, dataset.src);
      }
    },
    onImageLoadError(err) {
      console.log(err);
    }
  }
})