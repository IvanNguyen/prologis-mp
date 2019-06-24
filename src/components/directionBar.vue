<template>
  <cover-view>
    <cover-view class="wrapper">
      <cover-view class="center-info">
        <cover-view class="center-name">{{selectedCenter.centerName}}</cover-view>
        <cover-view class="content-wrapper lh-18">
          <cover-view class="d-flex">
            <cover-view class="text">地址</cover-view>
            <cover-view class="content">{{selectedCenter.address}}</cover-view>
          </cover-view>
          <cover-view class="d-flex">
            <cover-view class="text">电话</cover-view>
            <cover-view @click="makeCall" class="content">{{selectedCenter.phoneNumber.areaCode}}-{{selectedCenter.phoneNumber.part1}}-{{selectedCenter.phoneNumber.part2}}</cover-view>
          </cover-view>
        </cover-view>
      </cover-view>

      <cover-view @click="openMap" class="center-direction" hover-class="button-hover">
        <cover-view class="button-wrapper">
          <cover-image
            class="direction-button"
            src="../../static/images/direction-icon.png"
            alt="direction-icon"
          />
        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>

import store from '../store/appstore';

export default {
  computed: {
    selectedCenter() {
      return store.getters.selectedCenter;
    },
    isAndroid() {
      return store.state.isAndroid;
    },
  },
  methods: {
    openMap() {
      wx.openLocation({
        latitude: this.selectedCenter.latitude,
        longitude: this.selectedCenter.longitude,
        scale: 12,
      });
    },
    makeCall() {
      wx.makePhoneCall({
        phoneNumber: this.selectedCenter.phoneNumber.phoneNumber,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../global.scss";
//content
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 15px;
  background: $theme-bg;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
}
.center-info {
  flex-grow: 1;
}
.center-name {
  font-size: 18px;
  color: $detail-content-title;
  line-height: 25px !important;
  font-weight: bold;
  margin-bottom: 7px;
}
.content-wrapper {
  font-size: 13px;
  color: $content-text-color;
}
.text {
  display: inline-block;
  padding-right: 5px;
}
.content {
  display: inline-block;
  font-weight: bold;
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
}
//button
.center-direction {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: $theme-color;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .direction-button {
    display: block;
    width: 24px;
    height: 24px;
    transform: rotate(-90deg);
  }
}
</style>
