// @ts-ignore
import * as echarts from './../../../comon/components/ec-canvas/echarts'

export const getDay = (baseYear: number, baseMonth: number): {
  days: number[];
  daysNum: number;
} => {
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
    baseDays = !(baseYear % 4) && !(baseYear % 400) ? 29 : 28
  }

  const days: number[] = [];

  for(let i = 1; i <= baseDays; i ++) {
    days.push(i);
  }
  return {
    days,
    daysNum: baseDays
  };
};



export const initPickerData = (baseYear, baseMonth): [number[], number[], number[]] => {

  const years: number[]= [];
  const months: number[] = [];
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

export const getCurrentMonthPickerValue = (year, month, startPickerData = pickerData, endPickerData = pickerData):{
  pickerValueStart: number[];
  pickerValueEnd: number[];
} => {
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

const color = ["#e54d42", "#f37b1d", "#8dc63f", "#91F2DE", "#FFDB5C", "#FF9F7F"];

export const initClassifyPieChart = (canvas, width, height, chartData) => {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color,
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['50%', '70%'],
      data: chartData,
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

export const initClassifyBarChart = (canvas, width, height, chartData) => {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  const option = {
    color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['心情']
    },
    xAxis: {
      type: 'category',
      data: chartData.map(_ => _.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: chartData.map(_ => _.value)
      },
    ]
  };

  chart.setOption(option);
  return chart;
}

export const initTrendLineChart = (canvas, width, height) => {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  const option = {
    color,
    legend: {
      data: ['狂喜', '开心', '一般', '不爽', '超烂'],
      bottom: 0,
      left: 'center',
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '狂喜',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '开心',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: '一般',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
};
