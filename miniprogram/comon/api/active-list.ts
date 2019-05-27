// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

import { diaryActives } from './../utils/index'

export interface IActiveListItem {
  _id: string;
  iconType: string;
  title: string;
  remark?: string;
}


export const getActiveList = async (openId): Promise<IActiveListItem[]> => {
  const db = wx.cloud.database();
  const diaryActivesCol = db.collection(diaryActives);
  


  return [];
}
