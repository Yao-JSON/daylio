

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