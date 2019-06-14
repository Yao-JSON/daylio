const day1: number[] = []
const day2: number[] = []
const day3: number[] = []
const day4: number[] = []

for (let i = 1; i <= 31; i++) {
  day1.push(i)
}
for (let i = 1; i <= 30; i++) {
  day2.push(i)
}
for (let i = 1; i <= 29; i++) {
  day3.push(i)
}
for (let i = 1; i <= 28; i++) {
  day4.push(i)
}




export const getPickerDay = (year?:number, month?: number): number[] => {

  if(month === 2) {
    if( year  && !(year % 4 && year % 400 )) {
      return day3;
    } else {
      return day4;
    }
  } 

  if(month && [4, 6,9,11 ].indexOf(month) !== -1 )  {
    return day2
  }


  return day1
}