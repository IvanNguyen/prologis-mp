<template>
  <view class="general-introduction-wrapper">
    <view class="content-row">
      <view class="company-picture-wrapper">
        <img class="company-picture" src="../../static/images/company.png" alt="company"/>
      </view>

      <view class="center-info">

        <view class="text headline">安博苏州金阊物流中心</view>

        <view class="address-wrapper">
          <view class="text">地址</view>
          <view class="text center-info__content">江苏省苏州市姑苏区金阊新城</view>
        </view>

        <view class="phone-wrapper">
          <view class="text">电话</view>
          <view class="text center-info__content">(021) 6482-9472</view>
        </view>

        <view class="overview-wrapper">
          <view class="text">概况</view>
          <view class="text center-info__content">108,000平方米</view>
        </view>

        <view class="distance-wrapper">
          <view class="text">距离你</view>
          <view class="text center-info__content">37km</view>
          <view class="text">
            <img class="location__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.company-picture {
  width: 109px;
  height: 119px;
}
.content-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 16px 15px;
  background-color: #EFF9F8;
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
  font-weight: 500;
}
.text {
  display: inline-block;
}
.location__smallLogo {
  padding-left: 5px;
  vertical-align: sub;
}
</style>
