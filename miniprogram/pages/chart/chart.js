// const app = getApp();
import {
  pickerData,
  currentDate,
  getCurrentMonthPickerValue, 
  getCurrentWeekPickerValue, 
  getCurrentYearPickerValue,
  getDay,
  getDateByPickerData,
  initClassifyPieChart,
  initClassifyBarChart,
} from './utils';
const app = getApp();
const { SystemInfo } = app.globalData;

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const pickerValue = getCurrentMonthPickerValue(currentYear, currentMonth);


let moodData =  [
  {
    moodIcon: 'happy-daxiao',
    num: 9,
    id: 1,
    moodKey: 'happy',
    moodTitle: '开心'
  },
  {
    moodIcon: 'happy-wink',
    num: 19,
    id: 2,
    moodTitle: '高兴',
    moodKey: 'happy',
  },
  {
    moodIcon: 'happy-wink',
    num: 29,
    id: 3,
    moodKey: 'happy',
    moodTitle: '不开心'
  },
  {
    moodIcon: 'happy-wink',
    num: 49,
    id: 4,
    moodKey: 'happy',
    moodTitle: '哈哈'
  },
  {
    moodIcon: 'happy-wink',
    num: 8,
    id: 5,
    moodKey: 'happy',
    moodTitle: '😄'
  },
  {
    moodIcon: 'happy-daxiao',
    num: 9,
    id: 6,
    moodKey: 'happy',
    moodTitle: '开心'
  },
  {
    moodIcon: 'happy-wink',
    num: 19,
    id: 7,
    moodTitle: '高兴',
    moodKey: 'happy',
  },
  {
    moodIcon: 'happy-wink',
    num: 29,
    id: 13,
    moodKey: 'happy',
    moodTitle: '不开心'
  },
  {
    moodIcon: 'happy-wink',
    num: 49,
    id: 14,
    moodKey: 'happy',
    moodTitle: '哈哈'
  },
  {
    moodIcon: 'happy-wink',
    num: 8,
    id: 15,
    moodKey: 'happy',
    moodTitle: '😄'
  },
];

let num = 0;
moodData.forEach(_ => num += _.num)

moodData = moodData.map(item => {
  item.percent = ((item.num/num) * 100 ).toFixed(2)
  return item;
})

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
    dateSelectPopupVisible: false,
    dateRange: [],
    dateRangeQuicklySelectKey: 1,
    dateRangeQuicklySelectValues: [
      '本周',
      '本月',
      '本年'
    ],
    pickerStartData: pickerData,
    pickerEndData: pickerData,
    pickerValueStart: pickerValue.pickerValueStart,
    pickerValueEnd: pickerValue.pickerValueEnd,
    ec: {},
    classifyChart: {
      chartTabs: ['饼图', '折线图'],
      chartKey: 0
    },
    moodData:[],
    swiperHeihgt: 300
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
      pickerStartData: pickerData,
      pickerEndData: pickerData,
      pickerValueStart: pickerValue.pickerValueStart,
      pickerValueEnd: pickerValue.pickerValueEnd,
      dateByYearMonth: {
        year: currentYear,
        month: currentMonth,
      },
      dateRange: [],
    }, () => {
      this.calcSwiperHeight();
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
  handlerConfirmSelectDateRange() {
    const { pickerStartData, pickerEndData, pickerValueStart, pickerValueEnd } = this.data;
    const startTime = getDateByPickerData(pickerValueStart, pickerStartData);
    const endTime = getDateByPickerData(pickerValueEnd, pickerEndData);

    if(+endTime.date < +startTime.date) {
      wx.showToast({
        title: '时间设置错误',
        icon:'none'
      })
      return;
    }

    this.setData({
      dateRange: [startTime, endTime],
      dateSelectPopupVisible: false
    });

  },
  dateSelectOpen() {
    this.setData({
      dateSelectPopupVisible: true,
    });
  },
  dateSelectClose() {
    this.setData({
      dateSelectPopupVisible: false
    })
  },
  dateRangeQuicklySelectChange(e) {
    const { pickerStartData, pickerEndData } = this.data;
    const dateRangeQuicklySelectKey = e.detail.key;

    let prickerValue;
    switch(dateRangeQuicklySelectKey) {
      case 0:
        prickerValue = getCurrentWeekPickerValue(currentDate, pickerStartData, pickerEndData);
        break;
      case 1:
        prickerValue = getCurrentMonthPickerValue(currentYear, currentMonth, pickerStartData, pickerEndData);
        break;
      default:
        prickerValue = getCurrentYearPickerValue(currentYear, pickerStartData, pickerEndData);
    }

    this.setData({
      dateRangeQuicklySelectKey,
      ...prickerValue
    })
  },
  pickerViewStartChange(e) {
    const { pickerStartData } = this.data;
    const val = e.detail.value;
    const year = pickerStartData[0][val[0]];
    const month = pickerStartData[1][val[1]];
    const baseDays = getDay(year, month);

    const newPickerData = [...pickerStartData];
    newPickerData[2] = baseDays.days;

    this.setData({
      pickerValueStart: val,
      pickerStartData: newPickerData
    });
  },
  pickerViewEndChange(e) {
    const { pickerEndData } = this.data;
    const val = e.detail.value;
    const year = pickerEndData[0][val[0]];
    const month = pickerEndData[1][val[1]];
    const baseDays = getDay(year, month);

    const newPickerData = [...pickerEndData];
    newPickerData[2] = baseDays.days;

    this.setData({
      pickerValueStart: val,
      pickerEndData: newPickerData
    });
  },
  classifyChartChange(e) {
    const { classifyChart } = this.data;
    const { key } = e.detail
    classifyChart.chartKey = key;
    this.setData({
      classifyChart
    })
  },
  moodInitPieChart(e) {
    const { moodData, classifyChart } = this.data;
    const chartData = moodData.map((item) => {
      const {moodTitle, num} = item;
      return {
        name: moodTitle,
        value: num
      }
    })
    if(classifyChart.chartKey === 0) {
      initClassifyPieChart(e.detail.canvas, e.detail.width, e.detail.height, chartData)
    } else {
      initClassifyBarChart(e.detail.canvas, e.detail.width, e.detail.height, chartData)
    }
  },
  barInit(e) {
    
  },
  // 计算 swiper
  onReady() {
    this.calcSwiperHeight();
  },
  calcSwiperHeight() {
    const selectQuery = wx.createSelectorQuery();
    selectQuery.select('.chart-container').boundingClientRect();
    selectQuery.exec((res) => {
      const style = res[0];
      if(style) {
        this.setData({
          swiperHeihgt: SystemInfo.windowHeight - style.bottom - 60
        });
      }
    })
  },
  jumpNewDiaryPage() {
    wx.navigateTo({
      url: "/pages/new-diary/select-mood/index",
    })
  }
});
