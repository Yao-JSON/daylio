import * as echarts from './../../components/ec-canvas/echarts';

export const getDay = (baseYear, baseMonth) => {
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

  const days = [];

  for(let i = 1; i <= baseDays; i ++) {
    days.push(i);
  }
  return {
    days,
    daysNum: baseDays
  };
};

export const initPickerData = (baseYear, baseMonth) => {

  const years= [];
  const months = [];
  for(let i = 1970; i <= 2099; i ++) {
    years.push(i);
  }
  for(let i = 1; i <= 12; i ++) {
    months.push(i);
  }
  const baseDays = getDay(baseYear, baseMonth);

  return [years, months, baseDays.days];
}

const now = new Date();

export const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const pickerData = initPickerData(currentDate.getFullYear(), currentDate.getMonth() + 1);

export const getCurrentYearPickerValue = (year, startPickerData = pickerData, endPickerData = pickerData) => {
  const pickerValueStart = [startPickerData[0].indexOf(year), 0, 0];
  const pickerValueEnd = [endPickerData[0].indexOf(year), 11, endPickerData[2].indexOf(getDay(year, 11+1).daysNum)];

  return  {
    pickerValueStart,
    pickerValueEnd
  }
}

export const getCurrentMonthPickerValue = (year, month, startPickerData = pickerData, endPickerData = pickerData) => {
  const pickerValueStart =  [startPickerData[0].indexOf(year), startPickerData[1].indexOf(month + 1), 0];
  const pickerValueEnd = [
    endPickerData[0].indexOf(year),
    endPickerData[1].indexOf(month + 1),
    endPickerData[2].indexOf(getDay(year, month+1).daysNum)
  ];

  return  {
    pickerValueStart,
    pickerValueEnd
  }
}

const s = 1000;
const m = 60 * s;
const h = 60 * m;
const d = h * 24;

export const getPickerValueByDate = (date, data = pickerData) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return [data[0].indexOf(year), data[1].indexOf(month + 1), data[2].indexOf(day)];
}

export const getCurrentWeekPickerValue = (date, startPickerData = pickerData, endPickerData = pickerData) => {
  const currentWeek = date.getDay();
  const start = new Date(+date - (currentWeek-1) * d);
  const end = new Date(+date + (6 - currentWeek + 1) * d);

  const pickerValueStart = getPickerValueByDate(start, startPickerData);
  const pickerValueEnd =  getPickerValueByDate(end, endPickerData);

  return {
    pickerValueStart,
    pickerValueEnd
  }
}

export const getDateByPickerData = (pickerValue, data = pickerData) => {
  const [yearIndex, monthIndex, dayIndex] = pickerValue;
  const [years, months, days] = data;

  const year = years[yearIndex];
  const month = months[monthIndex];
  const day = days[dayIndex];

  return {
    dateFmt: `${year}-${month}-${day}`,
    date: new Date(year, month - 1, day )
  }
}

export const initClassifyRingChart = (canvas, width, height, F2) => {
  console.log(this,canvas, width, height, F2);
}



export const  initChart = (canvas, width, height) => {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}