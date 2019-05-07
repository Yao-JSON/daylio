let backgroundImage = '';
const backgroundKey = 'diary-global-background-image';


try {
  backgroundImage = wx.getStorageSync(backgroundKey)
} catch (e) {
  // Do something when catch error
  backgroundImage = '';
  // backgroundImage = "https://cdn.nlark.com/yuque/0/2019/jpeg/96328/1554208165500-106393e0-47be-435a-b835-861da84ce2a8.jpeg"
}
