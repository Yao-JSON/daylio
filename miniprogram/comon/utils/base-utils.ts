export const backgroundImageList = [
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165500-106393e0-47be-435a-b835-861da84ce2a8.jpeg',
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165566-1350c54a-bd2e-46da-87cd-c83354ea201a.jpeg',
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165567-815d49e0-451d-4226-862d-4effa318c884.jpeg',
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165579-10e37824-e73e-4446-9c00-d6dd0a8f5a9d.jpeg',
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165604-a40f12ef-2eff-475b-81ea-ffac78f2c76a.jpeg',
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165616-18705ed5-c2ce-43ee-aece-109d3fc03ff5.jpeg',
  'https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165624-000b657c-6605-4c7f-9c68-a6613a6c1637.jpeg'
]

class GlobalData {
  data: {
    [propsName: string]: any;
  };
  constructor() {
    this.data = {};
  }
  
  get<T>(key: string): T | null {
    return this.data[key] || null;
  }
  // @ts-ignore
  set(key: string, value) {
    this.data[key] = value;
    return this;
  }
}


export const globalData = new GlobalData();
