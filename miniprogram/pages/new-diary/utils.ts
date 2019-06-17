export interface IActiveListItem {
  activeIcon: string;
  title: string;
  id: number;
}

export const activeList = [
  {
    activeIcon:"business-dasao",
    title: "工作",
    id: 1,
  },
  {
    activeIcon:"business-chanpin",
    title: "休息",
    id: 2,
  },
  {
    activeIcon:"business-chucha",
    title: "约会",
    id: 3,
  },
  {
    activeIcon:"business-zuzhijiagou",
    title: "工作",
    id: 4,
  },
  {
    activeIcon:"business-chanpin",
    title: "休息",
    id: 5,
  },
  {
    activeIcon:"business-baoxiao",
    title: "约会",
    id: 6,
  },
  {
    activeIcon:"business-dianhua",
    title: "工作",
    id: 7,
  },
  {
    activeIcon:"business-caigou",
    title: "休息",
    id: 8,
  },
  {
    activeIcon:"business-gongzuo",
    title: "约会",
    id: 9,
  },
];

export interface IMoodsListItem {
  key: string;
  mood: string[];
  text: string;
}

export const moodsList = [
  {
    key: 'happy',
    mood: ['happy-daxiao', 'happy-wink'],
    text: '狂喜'
  },
  {
    key: 'kaixin',
    mood: ['kaixin-ufo'],
    text: '开心'
  },
  {
    key: 'yiban',
    mood: ['yiban-headache'],
    text: '一般'
  },
  {
    key: 'bushuang',
    mood: ['bushuang-karate'],
    text: '不爽'
  },
  {
    key: 'chaolan',
    mood: ['chaolan-kulian'],
    text: '超烂'
  }
]


export enum levelMood {
  happy = 5,
  kaixin = 4,
  yiban = 3,
  bushuang = 2,
  chaolan =1,
};