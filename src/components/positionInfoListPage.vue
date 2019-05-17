<template>
  <view class="position-info-wrapper">

    <view class="thumbnail-wrapper">
      <img class="thumbnail" src="../../static/images/circleLogo.png" alt="Logo"/>
    </view>
    
    <view class="position-info__detail">

      <view class="region-wrapper">
        <view class="text">你目前的所在区域:</view>
        <view class="text position-info__content">{{closestCenterRegion}}</view>
      </view>
      
      <view class="address-wrapper">
        <view class="text">离你最近的物业:</view>
        <view class="text position-info__content address">{{closestCenterName}}</view>
        <view class="text position-info__content distance">{{closestCenterDistance}} km</view>
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
  data() {
    return {
      // currentRegion: '华东区',
      // closestCenter: '上海青浦物流中心',
      // distance: 37,
    };
  },
  computed: {
    closestCenterRegion() {
      return store.state.closestCenter.region;
    },
    closestCenterName() {
      return store.state.closestCenter.centerName;
    },
    closestCenterDistance() {
      return store.state.closestCenter.distance;
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
}
.thumbnail {
  height: 46px;
  width: 46px;
  padding: 17px 15px;
}
.position-info__detail {
  flex-grow: 1;
  font-size: 13px;
  line-height: 23px;
  color: $button-text-color;
}
.position-info__content {
//   font-family: -apple-system !important;
  font-weight: bold;
  padding-left: 5px;
}
.address {
  white-space: nowrap;
  max-width: 140px;
  overflow: hidden;
  text-overflow:ellipsis;
}
.text {
  display: inline-block !important;
  line-height:1.2;
  overflow:hidden;
  white-space:nowrap;
  pointer-events:auto;
  font-family:-apple-system;
}
.position__smallLogo {
  padding-left: 5px;
  vertical-align: text-top !important;
}
</style>
