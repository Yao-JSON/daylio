
interface IEventListItem {
  moodValue: number;
  moodIcon: string;
  moodText: string;
  activity?: Array<{
    id: number;
    title: string;
    activityIcon: string;
  }>;
  date: string;
  time: string;
  createTime: number;
  content: string;
}


interface IDiaryProps {

}

interface IDiaryInstance {
  data: {
    titmeValue: number[];
    list: IEventListItem[];
  }
}

Page<IDiaryProps, IDiaryInstance>({
  data: {
    titmeValue: [],
    list: [
      {
        // 心情: 狂喜
        moodValue: 5,
        moodIcon: "ios-body",
        moodText: "狂喜",
        activity: [
          {
            id: 1,
            title: '打扫',
            activityIcon: 'ios-body'
          },
          {
            id: 1,
            title: '打扫',
            activityIcon: 'ios-body'
          },
          {
            id: 1,
            title: '打扫',
            activityIcon: 'ios-body'
          }
        ],
        date: "3月24日 星期日",
        time: "下午 10:04",
        createTime: 1553782664805,
        content: "打扫卫生，打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生"
      },{
        // 心情: 狂喜
        moodValue: 5,
        moodIcon: "ios-body",
        moodText: "还行",
        activity: [{
          id: 1,
          title: '打扫',
          activityIcon: 'ios-body'
        }],
        date: "3月24日 星期日",
        time: "下午 10:04",
        createTime: 1553782664805,
        content: "打扫卫生，打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生"
      },
      {
        // 心情: 狂喜
        moodValue: 5,
        moodIcon: "ios-body",
        moodText: "超烂",
        activity: [],
        date: "3月24日 星期日",
        time: "下午 10:04",
        createTime: 1553782664805,
        content: "打扫卫生，打扫卫生打扫卫生打扫卫生打扫卫生打扫卫生"
      }
    ]
  },
  onShow() {
    if (typeof this.getTabBar === 'function') {
        const tabBarCtx = this.getTabBar();
        if(tabBarCtx) {
          // @ts-ignore
          tabBarCtx.setData({
            selected: 0
          })
        }
      }
  }
})
