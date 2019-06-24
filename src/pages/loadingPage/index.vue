<template>
  <view class="page-body">
    <div class="title-chinese">
      <p>引</p>
      <p>领</p>
      <p>未</p>
      <p>来</p>
    </div>
    <div class="title-english">
      <p>Ahead of What's Next</p>
    </div>

    <div class="bottom-block">
      <div class="bottom-line"></div>
      <p>
        读取中
      </p>
    </div>
  </view>
</template>

<script>
export default {
  onShow() {
    setTimeout(
      () => {
        wx.navigateTo({ url: '/pages/homePage/main' });
      },
      2000,
    );
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
.page-body {
  width: 100%;
  height: 100vh;
  background: $theme-color;
  justify-content: spac
}
.title-chinese {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto;
  color: white;
  margin-bottom: 15px;
  padding-top: 35vh;
  font-size: 35px;
}
.title-english {
  text-align: center;
  color: white;
  font-size: 24px;
  width: 80%;
  margin: 0 auto;
}
.bottom-block {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
  p {
    color: white;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;

  }
}
.bottom-line {
  width: 100%;
  height: 2px;
  background: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>

