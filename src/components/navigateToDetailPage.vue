<template>
    <cover-view class="button-row">
      <cover-view @click="toRoutePage" class="button direction-button" hover-class="button-hover">
        <cover-image src="../../static/images/direction-icon.png" alt="direction-icon"/>
        <cover-view class="text">路线</cover-view>
      </cover-view>
      <cover-view @click="toDetailPage" class="button detail-button" hover-class="button-hover">
        <cover-view class="text">详细介绍</cover-view>
      </cover-view>
    </cover-view>
</template> 

<script>
export default {
//   props: ['pageTitle']
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
@import '../global.scss';
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
