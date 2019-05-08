<template>
  <div class="general-introduction">
    <div class="content-row">
      <img class="company-picture" src="../../static/images/company.png" alt="company">
      <div class="center-info">
        <p class="headline">安博苏州金阊物流中心</p>
        <p>
          地址
          <span>江苏省苏州市姑苏区金阊新城</span>
        </p>
        <p>
          电话
          <span>(021) 6482-9472</span>
        </p>
        <p>
          概况
          <span>108,000平方米</span>
        </p>
        <p>
          距离你
          <span>37km</span>
          <img
            class="position__smallLogo"
            src="../../static/images/smallLocation.png"
            alt="smallLocation"
          >
        </p>
      </div>
    </div>
    <div class="button-row">
      <button @click="toRoutePage" class="direction-button" hover-class="button-hover">
        <img src="../../static/images/direction-icon.png" alt="direction-icon">
        路线
      </button>
      <button @click="toDetailPage" class="detail-button" hover-class="button-hover">详细介绍</button>
    </div>
  </div>
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
.general-introduction {
  position: fixed;
  z-index: 1;
  top: 82PX;
  left: 0;
  width: 100%;
  height: 215px;
  // height: 0;
  background-color: #ffffff;
  overflow: hidden;
}
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
p {
  // padding-bottom: 5px;
  line-height: 23px;
  span {
    padding-left: 7px;
  }
}
.position__smallLogo {
  padding-left: 5px;
}
.button-row {
  display: flex;
  margin-left: 15px;
}
button {
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
  img {
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
