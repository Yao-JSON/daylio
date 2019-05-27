// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

import { diaryActives, activesItem } from './../utils/index'

export interface IActiveListItem {
  _id: string;
  iconType: string;
  title: string;
  remark?: string;
}


export const getActiveList = async (openId): Promise<IActiveListItem[]> => {
  const db = wx.cloud.database();
  const _ = db.command;
  const diaryActivesCol = db.collection(diaryActives);
  const activesItemCol = db.collection(activesItem);

  const activesResult = await diaryActivesCol.doc(openId).get().catch(err => { return { data: null, errMsg: err } });
  const { data } = activesResult;

  if(data) {
    const { ids } = data;
    const idsEq = ids.map(id => {
      return _.eq(id);
    });

    const result = await activesItemCol.where({
      _id: _.or(idsEq)
    }).get().catch((err) => {
      return {
        data: [],
        errMsg: err
      }
    });
    // @ts-ignore
    return result.data;
  }

  return [];
}

interface IAddOrUpdateActiveParams {
  id?: string,
  iconType: string,
  title: string,
  remark?: string;
}


export const addOrUpdateActive = async (params: IAddOrUpdateActiveParams, openId): Promise<any> => {
  const { id, iconType, title, remark = '' } = params;
  const db = wx.cloud.database();
  const activesItemCol = db.collection(activesItem);
  const diaryActivesCol = db.collection(diaryActives);
  const now = new Date().getTime();
  // 新增
  if(!id) {
    const activesItemResult = await activesItemCol.add({
      data: {
        createTime: now,
        updateTime: now,
        iconType,
        title,
        remark 
      }
    });

    const diaryActivesResult = await diaryActivesCol.doc(openId).get().catch((err) => {
      return {
        data: null,
        errMsg: err
      }
    })

    const { data } = diaryActivesResult;
    if(data) {
      const { ids } = data;
      ids.unshift(activesItemResult._id);

      return await diaryActivesCol.doc(openId).update({
        data: {
          ids
        }
      })
    }
  } else {
    return await activesItemCol.doc(id).update({
      data: {
        iconType,
        title,
        remark,
        updateTime: now
      }
    })
  }

}
