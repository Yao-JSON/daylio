Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [{
        "pagePath": "pages/diary/diary",
        "iconPath": "/images/tabbar/basics.png",
        "selectedIconPath": "/images/tabbar/basics_cur.png",
        "text": "日记"
      },
      {
        "pagePath": "pages/chart/chart",
        "iconPath": "/images/tabbar/component.png",
        "selectedIconPath": "/images/tabbar/component_cur.png",
        "text": "统计"
      },
      {
        "pagePath": "pages/calendar/calendar",
        "iconPath": "/images/tabbar/plugin.png",
        "selectedIconPath": "/images/tabbar/plugin_cur.png",
        "text": "扩展"
      },
      {
        "pagePath": "pages/about/about",
        "iconPath": "/images/tabbar/about.png",
        "selectedIconPath": "/images/tabbar/about_cur.png",
        "text": "关于"
      }
    ]
  },
  methods: {
    switchTab(e) {      
      const url = e.currentTarget.dataset.path
      wx.switchTab({
        url
      })
    }
  },
  pageLifetimes: {
  },
})