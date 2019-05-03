// const app = getApp();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();


const initPickerData = () => {
  
}

Page({
  data: {
    tabs: [
      {
        key: 0,
        title: '分类'
      },
      {
        key: 1,
        title: '趋势',
      },
      {
        key: 2,
        title: '对比',
      },
    ],
    tabKey: 0,
    dateByYearMonth: {
      year: currentYear,
      month: currentMonth,
    },
    dateSelectVisible: true,
    dateRange: [
      {
        date: '2019-01-20',
      },{
        date: '2019-02-23'
      }
    ],
    dateRangeQuicklySelectKey: [
      '本周',
      '本月',
      '本年'
    ],
    pickerData: initPickerData()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onTabsChange(e) {
    const { key } = e.detail;
    this.setData({
      tabKey: key,
    })
  },
  onSwiperChange(e) {
    const { current } = e.detail;
    this.setData({
      tabKey: current
    })
  },
  dateBackMonth(e) {
    const { dateByYearMonth } = this.data;
    const { year, month } = dateByYearMonth;
    let backMonth = month - 1;
    let backYear = year;
    if(backMonth < 0) {
      backYear = year - 1;
      backMonth = 11;
    }
    this.setData({
      dateByYearMonth: {
        year: backYear,
        month: backMonth
      }
    });
  },
  dateForwardMonth() {
    const { dateByYearMonth } = this.data;
    const { year, month } = dateByYearMonth;

    let forwradMonth = month + 1;
    let forwradYear = year;
    if(forwradMonth > 11) {
      forwradMonth = 0;
      forwradYear += 1;
    }

    if(forwradYear >= currentYear && forwradMonth > currentMonth) {
      return;
    }

    this.setData({
      dateByYearMonth: {
        year: forwradYear,
        month: forwradMonth 
      }
    });
  },
  // 选择时间范围
  selectDateRange() {
    
  },
  dateSelectOpen() {
    this.setData({
      dateSelectVisible: true,
    });
  },
  dateSelectClose() {
    this.setData({
      dateSelectVisible: false
    })
  }
});
