<template>
  <cover-view class="general-introduction-wrapper">
    <cover-view class="content-row">
      <cover-view class="company-picture-wrapper">
        <cover-view class="picture-placeholder">
          <cover-image src="../../static/images/logo.png" alt="company"/>
        </cover-view>
        <cover-image class="company-picture" :src="selectedCenter.avatar" alt="company"/>
      </cover-view>

      <cover-view  class="center-info lh-18">
        
        <cover-view class="text headline">{{selectedCenter.centerName}} </cover-view>

        <cover-view class="address-wrapper">
          <cover-view class="text">地址</cover-view>
          <cover-view class="text center-info__content">{{selectedCenter.address}} </cover-view>
        </cover-view>

        <cover-view class="phone-wrapper">
          <cover-view class="text">电话</cover-view>
          <cover-view @click="makeCall" class="text center-info__content">{{selectedCenter.phoneNumber.areaCode}}-{{selectedCenter.phoneNumber.part1}}-{{selectedCenter.phoneNumber.part2}} </cover-view>
        </cover-view>
       
        <cover-view class="overview-wrapper">
          <cover-view class="text">概况</cover-view>
          <cover-view class="text center-info__content">{{selectedCenter.area}} 平方米 </cover-view>
        </cover-view>

        <cover-view class="distance-wrapper">
          <cover-view class="text">距离你</cover-view>
          <cover-view class="text center-info__content">{{selectedCenter.distance}} km </cover-view>
          <cover-view class="text">
            <cover-image class="location__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/>
          </cover-view>
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
    makeCall() {
      wx.makePhoneCall({
        phoneNumber: this.selectedCenter.phoneNumber.phoneNumber,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.company-picture-wrapper {
  width: 109px;
  height: 119px;
  position: relative;
  flex-shrink: 0;
}
.picture-placeholder {
  position: absolute;
  z-index: -1;
}
.company-picture {
  width: 109px;
  height: 119px;
}
.content-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 16px 15px;
}
.center-info {
  flex-grow: 1;
  font-size: 13px;
  font-weight: 300;
  padding-left: 9px;
  cover-view {
    display: flex !important;
  }
  &__content {
    padding-left: 7px;
  }
}
.headline {
  font-weight: bold !important;
}
.address-wrapper {
  display: flex;
  cover-view:first-child {
    flex-shrink: 0;
  }
  .center-info__content {
    white-space: normal;
  }
}
.text {
  display: inline-block;
}
.location__smallLogo {
  padding-left: 5px;
  vertical-align: sub;
}
</style>
