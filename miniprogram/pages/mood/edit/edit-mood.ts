import { IMyApp } from './../../../../../miniprogram-ts/miniprogram/app';
import iconList, {IActiveIconListItem} from './icon-list'
import { colorLevel, IColorLevelItem } from '../utils'
import { addOrUpdateMoods } from './../../../comon/api/index'

const app = getApp<IMyApp>();

interface IEditMoodProps {
  handlerChange: (e) => void;
  handlerConfirm: () => void;
}
interface IEditMoodInstance {
  data: {
    id: number | null;
    iconType: string;
    title: string;
    iconList: IActiveIconListItem[];
    moodLevel: number;
    moodLevelColorType: string;
    colorLevel: IColorLevelItem[];
  },
  onLoad: (query:Record<string, any>) => void;
}

Page<IEditMoodProps, IEditMoodInstance>({
  // @ts-ignore
  data: {
    id: null,
    iconType: "happy-daxiao",
    title: '',
    iconList,
    moodLevel: 5,
    moodLevelColorType: 'happy',
    colorLevel
  },
  // 编辑心情
  handlerChange(e) {
    this.setData({
      title: e.detail.value
    });
  },
  // icon 选择
  handlerSelectIcon(e) {
    const { iconType, moodLevelColorType, moodLevel } = this.data;
    const { dataset } = e.currentTarget;
    this.setData({
      iconType: dataset && dataset.iconType ? dataset.iconType : iconType,
      moodLevelColorType: dataset && dataset.moodLevelColorType ? dataset.moodLevelColorType : moodLevelColorType,
      moodLevel: dataset && dataset.moodLevel ? dataset.moodLevel : moodLevel
    });
  },
  // 确定
  handlerConfirm() {
    const { id, iconType, title, moodLevel } = this.data;

    console.log(id, iconType, title, moodLevel);

    addOrUpdateMoods({
      id,
      iconType,
      title,
      level: moodLevel
    }, app.globalData.openId).then((res) => {
      console.log(res);
    })

  },
  onLoad(query) {
    const { id, iconType, title, level } = query;
    if(!id) {
      wx.setNavigationBarTitle({
        title: "新增心情",
      })
    } else {
      const levelColorType = level ? colorLevel[level-1].levelColorType : 'happy';
      this.setData({
        id,
        iconType,
        title,
        moodLevel: +level,
        moodLevelColorType: levelColorType
      })
    }

  }
})