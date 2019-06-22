// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

import { diaryActives, diaryEventList, searchAndCacheActives } from '../utils/index';

export interface IActiveListItem {
  _id: string;
  iconType: string;
  title: string;
  remark?: string;
}

export interface IAddOrUpdateActiveParams {
  id?: string,
  iconType: string,
  title: string,
  remark?: string;
}


export const addOrUpdateActive = async (params: IAddOrUpdateActiveParams, openId) => {
  const { id, iconType, title } = params;
  const db = wx.cloud.database();
  const diaryActivesCol = db.collection(diaryActives);
  const now = new Date().getTime();
  let result: any = null;

  if(id) {
    result = await diaryActivesCol.doc(id).update({
      data: {
        iconType,
        title,
        updateTime: now,
      }
    })
  } else {
    result = await diaryActivesCol.add({
      data: {
        iconType,
        title,
        updateTime: now,
        createTime: now,
        remark: ''
      }
    })
  }

  await searchAndCacheActives(openId);
  
  return result;
}

export interface IAddOrUpdateEventParams {
  id?: number;
  // 上传图片的文件 id
  remark: string;
  activeListIds: string[];
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
  activeListIds: string[];
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

