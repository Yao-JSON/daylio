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


export const getMood = async (ids: string[], colName): Promise<IMoodListItemListItem[]>  => {
  const db = wx.cloud.database();
  const col = db.collection(colName);
  const _ = db.command;

  const _ids = ids.map(id => _.eq(id))

  const result = await col.where({ _id: _.or(_ids) }).get().catch((err) => { return { errMsg: err, data: null } });

  if(result.data) {
    // @ts-ignore
    return result.data;
  }

  return []
}

export const getMoodsLists = async (openId): Promise<IMoodListItem[]>  => {
  const db = wx.cloud.database();
  const col = db.collection(diaryMoods);
  const moodListResult = await col.doc(openId).get().catch((err) => { return { errMsg: err, data: null } });
  const { data } = moodListResult;
  if(data) {
    const { happy, kaixin, yiban, bushuang, chaolan  } = data.data;
    const happyList = await getMood(happy.list, moodsHappy);
    const kaixinList = await getMood(kaixin.list, moodsKaixin);
    const yibanList = await getMood(yiban.list, moodsYiban);
    const bushuangList = await getMood(bushuang.list, moodsBushuang);
    const chaolanList = await getMood(chaolan.list, moodsChaolan);
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
    return result;
  }
  return [];
}


interface IMoodsListItemPrams {
  iconType: string;
  title: string;
  level: number;
  id?: string;
}

export const addOrUpdateMoods = async(params: IMoodsListItemPrams, openId): Promise<any> => {
  const { id, level, iconType, title } = params;
  const db = wx.cloud.database();
  const moodsColName = moodsColLevel[level];
  const moodsCol = db.collection(moodsColName);

  const now = new Date().getTime();

  // 新增
  if(!id) {
    const moodsResult = await moodsCol.add({data: { iconType, title, createTime: now, updateTime: now}});
    const { _id } = moodsResult;

    const moodsKey = moodsLevelType[level];
    const diaryMoodsCol = db.collection(diaryMoods);
    const diaryMoodsResult = await diaryMoodsCol.doc(openId).get().catch(err => { return { errMsg: err, data: null } });
    
    const { data } = diaryMoodsResult;

    if(data) {
      const diaryMoodsKeysItem = data.data[moodsKey];

      const { list } = diaryMoodsKeysItem;
      list.push(_id);
      return await diaryMoodsCol.doc(openId).update({
        data: {
          data: {
            [moodsKey]: {
              list
            }
          },
          updateTime: now
        }
      })
    }
  } else {
    return  await moodsCol.doc(id).update({
      data: {
        iconType,
        title,
        updateTime: now
      }
    })
  }
}

