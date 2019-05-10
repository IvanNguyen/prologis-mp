<template>
  <cover-view class="general-introduction-wrapper">
    <cover-view class="content-row">
      <cover-view class="company-picture-wrapper">
        <cover-image class="company-picture" src="../../static/images/company.png" alt="company"/>
      </cover-view>

      <cover-view class="center-info">
        
        <cover-view class="text headline">安博苏州金阊物流中心</cover-view>

        <cover-view class="address-wrapper">
          <cover-view class="text">地址</cover-view>
          <cover-view class="text center-info__content">江苏省苏州市姑苏区金阊新城</cover-view>
        </cover-view>

        <cover-view class="phone-wrapper">
          <cover-view class="text">电话</cover-view>
          <cover-view class="text center-info__content">(021) 6482-9472</cover-view>
        </cover-view>
       
        <cover-view class="overview-wrapper">
          <cover-view class="text">概况</cover-view>
          <cover-view class="text center-info__content">108,000平方米</cover-view>
        </cover-view>

        <cover-view class="distance-wrapper">
          <cover-view class="text">距离你</cover-view>
          <cover-view class="text center-info__content">37km</cover-view>
          <cover-view class="text">
            <cover-image class="location__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/>
          </cover-view>
        </cover-view>
      </cover-view>

    </cover-view>
  </cover-view>
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
