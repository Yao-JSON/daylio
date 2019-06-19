// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')


import { diaryEventList } from './../utils/index'

export interface IGetTimeLineParams {

}


export interface IGetTimeLineResult {}

export const getTimeLineList = async () => {
  const db = wx.cloud.database();
  const diaryEventListCol = db.collection(diaryEventList);

  return diaryEventListCol;
}
