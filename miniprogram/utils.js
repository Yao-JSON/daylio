class GlobalData {
  constructor() {
    this.data = {};
  }

  get(key) {
    return this.data[key] || null;
  }

  set(key, value) {
    this.data[key] = value;
    return this;
  }
}

export const globalData = new GlobalData();