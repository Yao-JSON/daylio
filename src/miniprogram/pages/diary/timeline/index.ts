// const app = getApp();

// console.log(app);


interface ITimelineEventListItemEventsItemActivityItem {
  id: number;
  title: string;
  activityIcon: string;
}

interface ITimelineEventListItemEventsItem {
  content?: string;
  moodIcon: string;
  moodKey: string;
  moodValue: number;
  moodText: string;
  time: string;
  activity: ITimelineEventListItemEventsItemActivityItem[];
}

interface ITimelineEventListItem {
  date: string;
  events: ITimelineEventListItemEventsItem[];
}


interface ITimelineProps {}

interface ITimelineInstance {
  data: {
    eventList: ITimelineEventListItem[];
  }
}

Page<ITimelineProps, ITimelineInstance>({
  data: {
    eventList: [
      {
        date: "6-17",
        events: [
          {
            content: "喵喵喵喵喵 🐱",
            moodIcon: "happy-daxiao",
            moodKey: "happy",
            moodValue: 4,
            moodText: "大笑",
            time: "下午 10:04",
            activity: [
              {
                id: 1,
                title: '约会',
                activityIcon: 'business-chanpin'
              },
              {
                id: 2,
                title: '聊天',
                activityIcon: 'business-chucha'
              },
              {
                id: 3,
                title: '打扫卫生',
                activityIcon: 'lvyou-house'
              }
            ],
          },
          {
            content: "喵喵喵喵喵 🐱",
            moodIcon: "kaixin-smile",
            moodKey: "kaixin",
            moodValue: 4,
            moodText: "开心",
            time: "下午 10:04",
            activity: [
              {
                id: 1,
                title: '约会',
                activityIcon: 'business-chanpin'
              },
              {
                id: 2,
                title: '聊天',
                activityIcon: 'business-chucha'
              },
              {
                id: 3,
                title: '打扫卫生',
                activityIcon: 'lvyou-house'
              }
            ],
          },
          {
            content: "喵喵喵喵喵 🐱",
            moodIcon: "yiban-headache",
            moodKey: "happy",
            moodValue: 4,
            moodText: "一般",
            time: "下午 10:04",
            activity: [
              {
                id: 1,
                title: '约会',
                activityIcon: 'business-chanpin'
              },
              {
                id: 2,
                title: '聊天',
                activityIcon: 'business-chucha'
              },
              {
                id: 3,
                title: '打扫卫生',
                activityIcon: 'lvyou-house'
              }
            ],
          }
        ] 
      },
      {
        date: "6-16",
        events: [
          {
            content: "喵喵喵喵喵 🐱",
            moodIcon: "happy-daxiao",
            moodKey: "happy",
            moodValue: 4,
            moodText: "开心",
            time: "下午 10:04",
            activity: [
              {
                id: 1,
                title: '约会',
                activityIcon: 'business-chanpin'
              },
              {
                id: 2,
                title: '聊天',
                activityIcon: 'business-chucha'
              },
              {
                id: 3,
                title: '打扫卫生',
                activityIcon: 'lvyou-house'
              }
            ],
          },
          {
            content: "喵喵喵喵喵 🐱",
            moodIcon: "happy-daxiao",
            moodKey: "happy",
            moodValue: 4,
            moodText: "开心",
            time: "下午 10:04",
            activity: [
              {
                id: 1,
                title: '约会',
                activityIcon: 'business-chanpin'
              },
              {
                id: 2,
                title: '聊天',
                activityIcon: 'business-chucha'
              },
              {
                id: 3,
                title: '打扫卫生',
                activityIcon: 'lvyou-house'
              }
            ],
          }
        ]
      }
    ]
  },
  onShow() {
    if (typeof this.getTabBar === 'function') {
        const tabBarCtx = this.getTabBar();
        if(tabBarCtx) {
          // @ts-ignore
          tabBarCtx.setData({
            selected: 2
          })
        }
      }
  }
});