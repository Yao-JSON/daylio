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


