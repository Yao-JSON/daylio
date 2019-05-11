
export const dateFtt = (fmt,date = new Date()) => {
  var o = {   
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

const weeks = ['日','一','二','三','四','五','六'];


interface IGetDateResult {
  dayMoon: string;
  dateFmt: string;
  week: string;
  isYestoday: boolean;
  isToday: boolean;
  date: number
};

export const getDate = (time: number): IGetDateResult => {
  const calcTime = time? new Date(time) : new Date();
  const now = new Date();
  const nowDay = now.getDate();
  const calcDay = calcTime.getDate();
  const calcWeeks = weeks[calcTime.getDay()]
  const calcHours = calcTime.getHours();

  return {
    dayMoon: calcHours >= 12 ? '下午' : '上午',
    dateFmt: dateFtt('yyyy-MM-dd hh:mm:ss',calcTime),
    week: calcWeeks,
    isYestoday: nowDay - 1 === calcDay,
    isToday: nowDay === calcDay,
    date: +calcTime
  }
};
