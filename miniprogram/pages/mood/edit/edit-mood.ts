import { IMyApp } from './../../../../../miniprogram-ts/miniprogram/app';
import  {activeIconList, defaultActiveIconList, IActiveIconListItem} from './icon-list'
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
    iconListOrigin: IActiveIconListItem[];
    iconList: string[];
    moodLevel: number;
    moodLevelColorType: string;
    colorLevel: IColorLevelItem[];
    isNewActive: boolean;
  },
  onLoad: (query:Record<string, any>) => void;
}

Page<IEditMoodProps, IEditMoodInstance>({
  // @ts-ignore
  data: {
    id: null,
    iconType: "happy-daxiao",
    title: '',
    iconListOrigin: activeIconList,
    iconList: defaultActiveIconList,
    moodLevel: 5,
    moodLevelColorType: 'happy',
    colorLevel,
    isNewActive: true
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
    addOrUpdateMoods({
      id,
      iconType,
      title,
      level: moodLevel
    }, app.globalData.openId).then((res) => {
      if(res._id) {
          wx.navigateBack({
            delta: 1
          });
      }
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
        moodLevelColorType: levelColorType,
        isNewActive: false
      })
    }
  },
  handlerLevelTap(e) {
    console.log(e);
    const { level } = e.target.dataset;

    if(level) {
      const levelColorType = level ? colorLevel[level-1].levelColorType : 'happy';
      this.setData({
        moodLevel: level,
        moodLevelColorType: levelColorType,
      })
    }

  }
})