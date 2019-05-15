<template>
  <view>
    <view class="group-button">
      <view @click="goBack" class="back-button" hover-class="button-hover">
        <view class="icon-wrapper">
          <img src="../../static/images/back-icon-white.png" alt="back-icon">
        </view>
      </view>

      <view class="vertical-line"></view>

      <view @click="toHomePage" class="home-button" hover-class="button-hover">
        <view class="icon-wrapper">
          <img src="../../static/images/home-icon.png" alt="home-icon">
        </view>
      </view>
    </view>
  </view>
</template> 

<script>
export default {
  methods: {
    goBack() {
      wx.navigateBack({ delta: 1 });
    },
    toHomePage() {
      wx.reLaunch({ url: '/pages/homePage/main' });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../global.scss";
.group-button {
  display: flex;
  position: relative;
  width: 95px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.19);
  border-radius: 50px;
  overflow: hidden;
}
.back-button,
.home-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.back-button {
  img {
    width: 9px;
    height: 13px;
  }
}
.home-button {
  img {
    width: 16px;
    height: 14px;
  }
}
.vertical-line {
  position: absolute;
  z-index: 100;
  top: 7px;
  left: 49.5%;
  width: 0.5px;
  height: 19px;
  background-color: white;
  opacity: 0.3;
}
</style>
