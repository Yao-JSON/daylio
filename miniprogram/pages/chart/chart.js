// const app = getApp();
import {
  pickerData,
  currentDate,
  getCurrentMonthPickerValue, 
  getCurrentWeekPickerValue, 
  getCurrentYearPickerValue,
  getDay,
  getDateByPickerData,
  initClassifyRingChart,
  initChart
} from './utils'
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();


const pickerValue = getCurrentMonthPickerValue(currentYear, currentMonth);

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
    classifyRingOptions: {
      onInit: initChart,
      width: '100%',
      height: '100px'
    }
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
      dateRange: []
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
  }
});
