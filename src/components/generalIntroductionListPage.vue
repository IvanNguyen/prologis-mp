<template>
  <view class="general-introduction-wrapper">
    <view @click="toDetailPage" class="content-row">
      <view class="company-picture-wrapper">
        <div class="picture-placeholder">
          <img src="../../static/images/logo.png" alt="company"/>
        </div>
        <img class="company-picture" :src="centerAvatar" alt="company"/>
      </view>

      <view class="center-info">

        <view class="text headline">{{centerName}}</view>

        <view class="address-wrapper">
          <view class="text">地址</view>
          <view class="text center-info__content">{{centerAddress}}</view>
        </view>

        <view class="phone-wrapper">
          <view class="text">电话</view>
          <view @click.stop="makeCall" class="text center-info__content">({{centerPhoneNumber.areaCode}}) {{centerPhoneNumber.part1}}-{{centerPhoneNumber.part2}}</view>
        </view> 

        <view class="overview-wrapper">
          <view class="text">概况</view>
          <view class="text center-info__content">{{centerArea}}平方米</view>
        </view>

        <view class="distance-wrapper">
          <view class="text">距离你</view>
          <view class="text center-info__content">{{centerDistance}}km</view>
          <view class="text">
            <img class="location__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>

import store from '../store/appstore';

export default {
  props: [
    'centerId',
    'centerName',
    'centerAddress',
    'centerPhoneNumber',
    'centerArea',
    'centerDistance',
    'centerAvatar',
  ],
  computed: {
    isShowGeneralIntroduction() {
      return store.state.isShowGeneralIntroduction;
    },
  },
  methods: {
    toDetailPage() {
      store.commit('setSelectedCenterId', this.centerId);
      wx.navigateTo({ url: '/pages/detailPage/main' });
    },
    makeCall() {
      wx.makePhoneCall({
        phoneNumber: this.centerPhoneNumber.phoneNumber,
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
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }
}
.company-picture {
  width: 109px;
  height: 119px;
  position: absolute;
  z-index: 2;
}
.address-wrapper {
  display: flex;
  & > view:first-child {
    flex-shrink: 0;
  }
}
.general-introduction-wrapper {
    padding: 20px 0 16px 15px;
    margin-bottom: 6px;
    background-color: $generalInfo-bg;
}
.content-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.center-info {
  flex-grow: 1;
  font-size: 13px;
  font-weight: 300;
  padding-left: 9px;
  line-height: 23px;
  &__content {
    padding-left: 7px;
  }
}
.headline {
  font-weight: bold;
}
.text {
  display: inline-block;
}
.location__smallLogo {
  padding-left: 5px;
  vertical-align: text-top !important;
}
</style>
