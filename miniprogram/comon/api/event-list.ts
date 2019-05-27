import { diaryEventList } from'./../../comon/utils/index'

export interface IAddEventParams {
  id?: string;
}


export const addEvent = (params: IAddEventParams) => {
  const { id, ...data } = params;
  const db = wx.cloud.database();
  const diaryEventListCol = db.collection(diaryEventList);

  let result: any = null;

  if(id) {
    result = diaryEventListCol.doc(id).update({
      data,
    })
  } else {
    result = diaryEventListCol.add({
      data: params,
    })
  }

  return result;
}

export interface IGetEventAllParams {
  page: number;
  size: number;
  openId: string;
}

export const getEventAll = (params: IGetEventAllParams) => {
  const { page = 1, size = 10, openId } = params;
  const db = wx.cloud.database();
  const diaryEventListCol = db.collection(diaryEventList);

  return diaryEventListCol.where({
    _openid: openId
  })
  .skip( (page - 1) * size )
  .limit(size)
  .get()
}

export interface IGetEventByIdParams {
  id: string;
}

export const getEventById = (params: IGetEventByIdParams) => {
  const { id } = params;
  const db = wx.cloud.database();
  const diaryEventListCol = db.collection(diaryEventList);
  return diaryEventListCol.where({
    _id: id
  }).get()
}
