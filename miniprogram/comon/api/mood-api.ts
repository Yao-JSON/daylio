import { IMoodListItem, IMoodListItemListItem } from '../../pages/mood/utils';
import { moodsBushuang, 
  moodsChaolan,
  moodsHappy,
  moodsKaixin,
  moodsYiban,
  diaryMoods,
  moodsColLevel,
  moodsLevelType
} from '../../comon/utils/index';
// @ts-ignore
var regeneratorRuntime = require('../../lib/regenerator/runtime-module.js')

export const getMoods = (ids, colName): Promise<IMoodListItemListItem[]> => {
  const db = wx.cloud.database();
  const col = db.collection(colName);
  const _ = db.command;
  return new Promise((reslove) => {
    col.where({_id: _.or(ids.map((id) => { return _.eq(id) }))}).get({
      success: (res) => {
        reslove(res.data);
      },
      fail(res) {
        console.log(res);
      }
    });
  })
};

export const getMoodsList = (openId): Promise<IMoodListItem[]> => {
  const db = wx.cloud.database();
  const col = db.collection(diaryMoods);

  return new Promise((resolve) => {
    col.doc(openId).get().then((moodListResult) => {
      const { happy, kaixin, yiban, bushuang, chaolan } = moodListResult.data.data;
      console.log(moodListResult.data.data);
      Promise.all([getMoods(happy.list, moodsHappy), getMoods(kaixin.list, moodsKaixin), getMoods(yiban.list, moodsYiban), getMoods(bushuang.list, moodsBushuang), getMoods(chaolan.list, moodsChaolan)])
      .then(([happyList, kaixinList,yibanList, bushuangList, chaolanList]) => {
        const result = [
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
        ];

        resolve(result);
      })

    })
  })
}


interface IMoodsListItemPrams {
  iconType: string;
  title: string;
  level: number;
  id?: string;
}

export const addOrUpdateMoods = async (params: IMoodsListItemPrams, openId) => {
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
    const diaryMoodsItem = await diaryMoodsCol.doc(openId).get();
    const diaryMoodsKeysItem = diaryMoodsItem.data.data[moodsKey]

    console.log(diaryMoodsKeysItem,  diaryMoodsKeysItem.list.push(_id));

    return await diaryMoodsCol.doc(openId).update({
      data: {
        data: {
          [moodsKey]: diaryMoodsKeysItem.list.push(_id)
        },
        updateTime: now
      }
    })

  } else {
    return  await moodsCol.doc(id).update({
      data: {
        ...data,
        updateTime: now
      }
    })
  }
}

