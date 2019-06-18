// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

import { diaryActives, activesItem, diaryEventList } from './../utils/index'

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


export interface IAddOrUpdateEventParams {
  id?: number;
  // 上传图片的文件 id
  remark: string;
  activeList: IActiveListItem[];
  moodKey: string;
  address: string | null;
  filePath: string | null;
  diaryTime: number;
  latitude: number | null;
  longitude: number | null;
}


interface IEventListItemFieldItem {
  id?: number;
  // 上传图片的文件 id
  fileID: string | null;
  remark: string;
  activeList: IActiveListItem[];
  moodKey: string;
  address: string | null;
  filePath: string | null;
  createTime?: number;
  updateTime?: number;
  latitude: number | null;
  longitude: number | null;
}

export const addOrUpdateEvent = async (params: IAddOrUpdateEventParams, openId) => {
  const { filePath, id = null, diaryTime, ...otherPaams } = params;
  const eventItem: IEventListItemFieldItem = {
    ...otherPaams,
    fileID: null,
    filePath,
  }

  if(filePath) {
    // @ts-ignore
    const cloudPath = 'images/user/' + openId + filePath.match(/\.[^.]+?$/)[0];
    const fileUploadResult = await wx.cloud.uploadFile({
      cloudPath,
      filePath
    });
    eventItem.fileID = fileUploadResult.fileID
  };


  const db = wx.cloud.database();
  const diaryEventListCol = db.collection(diaryEventList)

  // 新增
  if(!id) {
    eventItem.createTime = +diaryTime;
    eventItem.updateTime = +diaryTime;
    const eventListAddResult = await diaryEventListCol.add({
      data: eventItem
    });
    return eventListAddResult;
  } else {
    eventItem.updateTime = +new Date();

    return await diaryEventListCol.doc(openId).update({
      data: eventItem
    })
  }
}

