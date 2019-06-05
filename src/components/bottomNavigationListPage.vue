<template>
  <view class="group-button">
    
    <view @click="backToHomePage" class="button map-button" hover-class="button-hover">
      <view class="content-wrapper">
        <view class="text">
          <img src="../../static/images/map-icon.png" alt="map-icon"/>
        </view>
        <view class="text">地图模式</view>
      </view>
    </view>

    <view class="vertical-line"></view>

    <view class="button list-button">
      <view class="content-wrapper disabled">
        <view class="text">
          <img src="../../static/images/list-icon.png" alt="list-icon"/>
        </view>
        <view class="text">列表模式</view>
      </view>
    </view>

  </view>
</template>

<script>

import store from '../store/appstore';

export default {
  methods: {
    backToHomePage() {
      store.commit('hideGeneralIntroduction');
      wx.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.group-button {
  width: 100%;
  height: 45px;
  border-radius: 50px;
  overflow: hidden;
  background-color: $theme-color;
  position: relative;
}
.vertical-line {
  position: absolute;
  z-index: 100;
  top: 8px;
  left: 50%;
  width: 2px;
  height: 30px;
  background-color: white;
  opacity: 0.3;
}
.button {
  display: inline-block;
  height: 100%;
  width: 50%;
  background-color: $theme-color;
  color: $button-text-color;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 45px;
}
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.map-button {
    position: relative;
    img {
      width: 18px;
      height: 16px;
      vertical-align: sub;
    }
}
.disabled {
  opacity: 0.3;
}
.list-button {
    img {
      width: 18px;
      height: 12px;
      margin-bottom: 1px;
      vertical-align: sub;
    }
}
.text {
  display: inline-block;
}
img {
  padding-right: 13px;
}
</style>