<template>
  <cover-view>
    <cover-view class="wrapper">
      <cover-view class="center-info">
        <cover-view class="center-name">{{centerName}}</cover-view>
        <cover-view class="content-wrapper">
          <cover-view>
            <cover-view class="text">地址</cover-view>
            <cover-view class="content">{{centerAddress}}</cover-view>
          </cover-view>
          <cover-view>
            <cover-view class="text">电话</cover-view>
            <cover-view class="content">{{centerPhone}}</cover-view>
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
export default {
  data() {
    return {
      centerName: '上海青浦配送中心',
      centerAddress: '中国上海青浦工业园新团路518号',
      centerPhone: '(021) 6482-9472',
    };
  },
  methods: {
    openMap() {
      wx.openLocation({
        latitude: 39.98406,
        longitude: 116.30752,
        scale: 5,
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
  line-height: 25px;
  font-weight: bold;
  margin-bottom: 7px;
}
.content-wrapper {
  font-size: 13px;
  line-height: 23px;
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
