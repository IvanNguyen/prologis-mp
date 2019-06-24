<template>
  <view class="position-info-wrapper">

    <view class="thumbnail-wrapper">
      <img class="thumbnail" src="../../static/images/circleLogo.png" alt="Logo"/>
    </view>
    
    <view class="position-info__detail">

      <view class="region-wrapper">
        <view class="text">你目前的所在区域:</view>
        <view class="text position-info__content">{{closestCenter.region}}</view>
      </view>
      
      <view class="address-wrapper">
        <view class="text">离你最近的物业:</view>
        <view class="text position-info__content address">{{closestCenter.centerName}}</view>
        <view class="text position-info__content distance">{{closestCenter.distance}}km</view>
        <view class="text position__smallLogo-wrapper">
          <img class="position__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/> 
        </view>
      </view>
    
    </view>
  </view>
</template>

<script>

import store from '../store/appstore';

export default {
  computed: {
    closestCenter() {
      return store.state.closestCenter;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.position-info-wrapper {
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: $theme-color;
  font-family: -apple-system;
}
.thumbnail-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.thumbnail {
  height: 46px;
  width: 46px;
  padding: 17px 15px;
}
.region-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 3px;
}
.position-info__detail {
  flex-grow: 1;
  font-size: 13px;
  color: $button-text-color;
}
.position-info__content {
  font-weight: bold;
  padding-left: 5px;
  font-size: 13px;
}
.address-wrapper {
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.address {
  white-space: nowrap;
  max-width: 40%;
  overflow: hidden;
  text-overflow:ellipsis;
}
.text {
  line-height:1.4;
  overflow:hidden;
  white-space:nowrap;
  pointer-events:auto;
  // font-family:-apple-system;
}
.position__smallLogo {
  padding-left: 5px;
  vertical-align: text-top !important;
}
</style>
