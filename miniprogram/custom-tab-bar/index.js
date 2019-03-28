Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [{
        "pagePath": "/pages/diary/diary",
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
        "pagePath": "/pages/new-diary/new-diary",
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
    ]
  },
  methods: {
    switchTab(e) {      
      const { url } = e.currentTarget.dataset;
      if(url) {
        wx.switchTab({
          url
        })
      }
      console.log(this.data);
    }
  },
  pageLifetimes: {
  },
})