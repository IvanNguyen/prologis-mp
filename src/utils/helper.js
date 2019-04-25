export const getLocal = (key) => {
  try {
    return wx.getStorageSync(key);
  } catch (e) {
    console.log('getStorageSync:err', e);
    return e;
  }
};
