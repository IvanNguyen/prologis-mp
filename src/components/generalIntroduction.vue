<template>
  <cover-view class="general-introduction">
    <cover-view class="content-row">
      <cover-image class="company-picture" src="../../static/images/company.png" alt="company"/>
      <cover-view class="center-info">
        <cover-view class="headline text">安博苏州金阊物流中心</cover-view>
        <cover-view class="text">
          地址
          <cover-view class="center-info__content">江苏省苏州市姑苏区金阊新城</cover-view>
        </cover-view>
        <cover-view class="text">
          电话
          <cover-view class="center-info__content">(021) 6482-9472</cover-view>
        </cover-view>
        <cover-view class="text">
          概况
          <cover-view class="center-info__content">108,000平方米</cover-view>
        </cover-view>
        <cover-view class="text">
          距离你
          <cover-view class="center-info__content">37km
            <cover-image
            class="position__smallLogo"
            src="../../static/images/smallLocation.png"
            alt="smallLocation"
          />
          </cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view class="button-row">
      <cover-view @click="toRoutePage" class="button direction-button" hover-class="button-hover">
        <cover-image src="../../static/images/direction-icon.png" alt="direction-icon"/>
        <cover-view class="text">路线</cover-view>
      </cover-view>
      <cover-view @click="toDetailPage" class="button detail-button" hover-class="button-hover">
        <cover-view class="text">详细介绍</cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  methods: {
    toDetailPage() {
      wx.navigateTo({ url: '/pages/detailPage/main' });
    },
    toRoutePage() {
      wx.navigateTo({ url: '/pages/routePage/main' });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../global.scss";
.company-picture {
  width: 109px;
  height: 119px;
}
.content-row {
  display: flex;
  margin: 20px 0 16px 15px;
}
.center-info {
  font-size: 13px;
  font-weight: 300;
  padding-left: 9px;
}
.headline {
  font-weight: 500;
}
.text {
  // padding-bottom: 5px;
  line-height: 23px;
}
.center-info__content {
  display: inline;
  padding-left: 7px;
}
.position__smallLogo {
  padding-left: 5px;
}
.button-row {
  display: flex;
  margin-left: 15px;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: auto;
  color: $text-color;
  font-weight: 400;
  font-size: 13px;
  line-height: 40px;
  background-color: $theme-color;
  border-radius: 50px;
  margin: 0;
  cover-image {
    width: 24px;
    height: 24px;
    padding-right: 10px;
  }
}
.direction-button {
  width: 109px;
}
.detail-button {
  margin-left: 9px;
  width: 227px;
}
</style>
