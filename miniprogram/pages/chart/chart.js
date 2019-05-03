// const app = getApp();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();


const initPickerData = (date) => {
  const baseYear = date.getFullYear();
  const baseMonth = date.getMonth() + 1;

  const years= [];
  const months = [];
  const days = [];

  for(let i = 0; i <= 10; i ++) {
    years.push(baseYear - i);
  }

  for(let i = 1; i <= 12; i ++) {
    months.push(i);
  }

  let tableDays = {
    1: 31,
    3: 31,
    5: 31,
    7: 31,
    8: 31,
    10: 31,
    12: 31,
    4: 30,
    6: 30,
    9: 30,
    11: 30
  }

  let baseDays = tableDays[baseMonth];
  
  if(baseMonth === 2) {
    baseDays = !(baseYear % 4) & !(baseYear % 400) ? 29 : 28
  }

  for(let i = 1; i <= baseDays; i ++) {
    days.push(i);
  }

  return [years, months, days];
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
    dateRangeQuicklySelectKey: 1,
    dateRangeQuicklySelectValues: [
      '本周',
      '本月',
      '本年'
    ],
    pickerData: initPickerData(currentDate),
    pickerValue: [2018, 3, 21]
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
  },
  dateRangeQuicklySelectChange(e) {
    this.setData({
      dateRangeQuicklySelectKey: e.detail.key
    })
  }
});
