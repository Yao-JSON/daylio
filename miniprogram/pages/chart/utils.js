
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

export const initChart = (canvas, width, height, F2) => {
  const { Util, G } = F2;
  const { Group } = G;
  let chart = null;
  function drawLabel(shape, coord, canvas) {
    const { center } = coord;
    const origin = shape.get('origin');
    const points = origin.points;
    const x1 = (points[2].x - points[1].x) * 0.75 + points[1].x;
    const x2 = (points[2].x - points[1].x) * 1.8 + points[1].x;
    const y = (points[0].y + points[1].y) / 2;
    const point1 = coord.convertPoint({ x: x1, y });
    const point2 = coord.convertPoint({ x: x2, y });

    // const group = new Group();
    const group = canvas.addGroup();
    group.addShape('Line', {
      attrs: {
        x1: point1.x,
        y1: point1.y,
        x2: point2.x,
        y2: point2.y,
        lineDash: [0, 2, 2],
        stroke: '#808080'
      }
    });
    const text = group.addShape('Text', {
      attrs: {
        x: point2.x,
        y: point2.y,
        text: origin._origin.type + '  ' + origin._origin.cost + ' 元',
        fill: '#808080',
        textAlign: 'left',
        textBaseline: 'bottom'
      }
    });
    const textWidth = text.getBBox().width;
    const baseLine = group.addShape('Line', {
      attrs: {
        x1: point2.x,
        y1: point2.y,
        x2: point2.x,
        y2: point2.y,
        stroke: '#808080'
      }
    });
    if (point2.x > center.x) {
      baseLine.attr('x2', point2.x + textWidth);
    } else if (point2.x < center.x) {
      text.attr('textAlign', 'right');
      baseLine.attr('x2', point2.x - textWidth);
    } else {
      text.attr('textAlign', 'center');
      text.attr('textBaseline', 'top');
    }
    //canvas.add(group);
    shape.label = group;
  }

  const data = [
    { type: '饮食', cost: 669.47, a: '1' },
    { type: '服饰美容', cost: 338, a: '1' },
    { type: '健康', cost: 118.5, a: '1' },
    { type: '生活用品', cost: 78.64, a: '1' },
    { type: '其他', cost: 14.9, a: '1' },
    { type: '交通出行', cost: 8.7, a: '1' }
  ];

  let sum = 0;
  data.map(obj => {
    sum += obj.cost;
  });
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);
  let lastClickedShape;
  chart.legend({
    position: 'bottom',
    offsetY: -5,
    marker: 'square',
    align: 'center',
    itemMarginBottom: 20,
    onClick(ev) {
      const { clickedItem } = ev;
      const dataValue = clickedItem.get('dataValue');
      const canvas = chart.get('canvas');
      const coord = chart.get('coord');
      const geom = chart.get('geoms')[0];
      const container = geom.get('container');
      const shapes = geom.get('shapes'); // 只有带精细动画的 geom 才有 shapes 这个属性

      let clickedShape;
      // 找到被点击的 shape
      Util.each(shapes, shape => {
        const origin = shape.get('origin');
        if (origin && origin._origin.type === dataValue) {
          clickedShape = shape;
          return false;
        }
      });

      if (lastClickedShape) {
        lastClickedShape.animate().to({
          attrs: {
            lineWidth: 0
          },
          duration: 200
        }).onStart(() => {
          if (lastClickedShape.label) {
            lastClickedShape.label.hide();
          }
        }).onEnd(() => {
          lastClickedShape.set('selected', false);
        });
      }

      if (clickedShape.get('selected')) {
        clickedShape.animate().to({
          attrs: {
            lineWidth: 0
          },
          duration: 200
        }).onStart(() => {
          if (clickedShape.label) {
            clickedShape.label.hide();
          }
        }).onEnd(() => {
          clickedShape.set('selected', false);
        });
      } else {
        const color = clickedShape.attr('fill');
        clickedShape.animate().to({
          attrs: {
            lineWidth: 5
          },
          duration: 350,
          easing: 'bounceOut'
        }).onStart(() => {
          clickedShape.attr('stroke', color);
          clickedShape.set('zIndex', 1);
          container.sort();
        }).onEnd(() => {
          clickedShape.set('selected', true);
          clickedShape.set('zIndex', 0);
          container.sort();
          lastClickedShape = clickedShape;
          if (clickedShape.label) {
            clickedShape.label.show();
          } else {
            drawLabel(clickedShape, coord, canvas);
          }
          canvas.draw();
        });
      }
    }
  });
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.5
  });
  chart.axis(false);
  chart.tooltip(false);
  chart.interval()
    .position('a*cost')
    .color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
    .adjust('stack');

  chart.guide().text({
    position: ['50%', '50%'],
    content: sum.toFixed(2),
    style: {
      fontSize: 24
    }
  });
  chart.render();
  return chart;
}
