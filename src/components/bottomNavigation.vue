<template>
  <cover-view class="group-button">
    
    <cover-view class="button map-button">
      <cover-view class="content-wrapper disabled">
        <cover-view class="text">
          <cover-image src="../../static/images/map-icon.png" alt="map-icon"/>
        </cover-view>
        <cover-view class="text">地图模式</cover-view>
      </cover-view>
    </cover-view>

    <cover-view class="vertical-line"></cover-view>

    <cover-view @click="toListpage" class="button list-button" hover-class="button-hover">
      <cover-view class="content-wrapper">
        <cover-view class="text mt-2">
          <cover-image src="../../static/images/list-icon.png" alt="list-icon"/>
        </cover-view>
        <cover-view class="text">列表模式</cover-view>
      </cover-view>
    </cover-view>

  </cover-view>
</template>

<script>

import store from '../store/appstore';

export default {
  methods: {
    toListpage() {
      store.commit('hideGeneralIntroduction');
      wx.navigateTo({ url: '/pages/listPage/main' });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.group-button {
  width: 100%;
  height: 45px;
  border-radius: 50PX;
  background-color: $theme-color;
  position: relative;
}
.vertical-line {
  position: absolute;
  z-index: 100;
  top: 8px;
  left: 49.5%;
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
    cover-image {
      width: 18px;
      height: 16px;
      vertical-align: sub;
    }
}
.disabled {
  opacity: 0.3;
}
.list-button {
  cover-image {
    width: 18px;
    height: 12px;
  }
}
.text {
  display: inline-block;
}
cover-image {
  padding-right: 13px;
}
</style>