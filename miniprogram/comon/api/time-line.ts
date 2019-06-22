// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')


import { diaryEventList, activesItem } from './../utils/index'

export interface IGetTimeLineParams {

}


export interface IGetTimeLineResult {}

export const getTimeLineList = async (openId) => {
  const db = wx.cloud.database();
  const _ = db.command
  const diaryEventListCol = db.collection(diaryEventList);
  const diaryActivesCol = db.collection(activesItem);

  const eventResult = await diaryEventListCol.where({ _openid: openId }).get();

  const eventActivePromise: any[] = [];
  const eventActiveKey: number[] = [];

  const eventList = eventResult.data;
  eventList.forEach((item, index) => {
    eventActiveKey.push(index);
    const { activeListIds } = item;
    eventActivePromise.push(
      diaryActivesCol.where({_openid: openId, _id: _.in(activeListIds) }).get()
    )
  })
  

  const eventActivePromiseResult =await Promise.all(eventActivePromise);


  eventActiveKey.forEach((i) => {
    eventList[i].activeList = eventActivePromiseResult[i].data;
    delete eventList[i].activeListIds;
  })
  
  return eventList;
}
