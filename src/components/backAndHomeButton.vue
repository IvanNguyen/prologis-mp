<template>
  <view>
    <view class="group-button">
      <view @click="goBack" class="back-button" hover-class="button-hover">
        <view class="icon-wrapper">
          <img src="../../static/images/back-icon-white.png" alt="back-icon">
        </view>
      </view>

      <view class="vertical-line"></view>

      <view @click="toHomePage" class="home-button" hover-class="button-hover">
        <view class="icon-wrapper">
          <img src="../../static/images/home-icon.png" alt="home-icon">
        </view>
      </view>
    </view>
  </view>
</template> 

<script>

import store from '../store/appstore';

export default {
  methods: {
    goBack() {
      wx.navigateBack({ delta: 1 });
    },
    toHomePage() {
      store.commit('hideGeneralIntroduction');
      wx.navigateBack({ delta: 2 });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../global.scss";
.group-button {
  display: flex;
  position: relative;
  // width: 86PX;
  // height: 31PX;
  width: 95PX;
  height: 31PX;
  background-color: rgba(0, 0, 0, 0.19);
  border-radius: 50px;
  overflow: hidden;
}
.back-button,
.home-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.back-button {
  img {
    width: 9PX;
    height: 13PX;
  }
}
.home-button {
  img {
    width: 16PX;
    height: 14PX;
  }
}
.icon-wrapper {
  display: flex;
}
.vertical-line {
  position: absolute;
  z-index: 100;
  top: 6PX;
  left: 49.5%;
  width: 1PX;
  height: 19PX;
  background-color: white;
  opacity: 0.2;
}
</style>
