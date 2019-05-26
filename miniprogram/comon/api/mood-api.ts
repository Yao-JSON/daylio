// @ts-ignore
const regeneratorRuntime = require('./../utils/runtime');


import { IMoodListItem, IMoodListItemListItem } from '../../pages/mood/utils';
import { moodsBushuang, moodsChaolan, moodsHappy, moodsKaixin, moodsYiban, diaryMoods } from '../../utils/index';

enum moodsColLevel {
   "moods-chaolan" = 1,
   "moods-bushuang" = 2,
   "moods-yiban" = 3,
   "moods-kaixin" = 4,
   "moods-happy" = 5
}

enum moodsLevelType {
  "chaolan" = 1,
  "bushuang" = 2,
  "yiban" = 3,
  "kaixin" = 4,
  "happy" = 5
}

export const getMoods = (ids, colName): Promise<IMoodListItemListItem[]> => {
  const db = wx.cloud.database();
  const col = db.collection(colName);
  const _ = db.command;

  return new Promise((reslove) => {
    col.where({_id: _.or(ids)}).get().then((res) => {
      const {data} = res;
      // @ts-ignore
      reslove(data);
    })
  })
};

export const getMoodsList = async (openId): Promise<IMoodListItem[]> => {
  const db = wx.cloud.database();
  
  
  const col = db.collection(diaryMoods);
  const moodListResult = await col.doc(openId).get();
  console.log(moodListResult);

  const { happy, kaixin, yiban, bushuang, chaolan } = moodListResult.data.data;

  const happyList = await getMoods(happy.list, moodsHappy);
  const kaixinList = await getMoods(kaixin.list, moodsKaixin);
  const yibanList = await getMoods(yiban.list, moodsYiban);
  const bushuangList = await getMoods(bushuang.list, moodsBushuang);
  const chaolanList = await getMoods(chaolan.list, moodsChaolan);

  return  [
    {
      label: '狂喜',
      level: 5,
      list: happyList
    },
    {
      label: '开心',
      level: 4,
      list: kaixinList
    },
    {
      label: '一般',
      level: 3,
      list: yibanList
    },
    {
      label: '不爽',
      level: 2,
      list: bushuangList
    },
    {
      label: '超烂',
      level: 1,
      list: chaolanList
    },
]

}


interface IMoodsListItemPrams {
  iconType: string;
  title: string;
  level: number;
  id?: string;
}

export const addOrUpdateMoods = async (params: IMoodsListItemPrams, openId, list) => {
  const { id, level, ...data } = params;
  const db = wx.cloud.database();
  const moodsColName = moodsColLevel[level];
  const moodsCol = db.collection(moodsColName);

  const now = new Date().getTime();

  // 新增
  if(!id) {
    const moodsResult = await moodsCol.add({data: { ...data, createTime: now, updateTime: now}});
    const { _id } = moodsResult;

    const moodsKey = moodsLevelType[level];
    const diaryMoodsCol = db.collection(diaryMoods);
    await diaryMoodsCol.doc(openId).update({
      data: {
        data: {
          [moodsKey]: list.push(_id)
        },
        updateTime: now
      }
    })

  } else {
     await moodsCol.doc(id).update({
      data: {
        ...data,
        updateTime: now
      }
    })
  }
}
