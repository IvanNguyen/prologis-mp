<template>
  <view class=imagePDF @click="goBack">
    <div class="swiper-wrapper">
      <swiper
        class="mySwiper"
        next-margin="50px"
      >
        <block
          :key="index"
          v-for="(image, index) in imagePDF"
        >
          <swiper-item>
            <img
              @click="previewImage"
              :id="image"
              :src="image"
              alt="swiper-item">
          </swiper-item>
        </block>
      </swiper>
    </div>
  </view>
</template>

<script>

import store from '../../store/appstore';
import { SHARE_MESSAGE } from '../../utils/constants';

export default {
  onShareAppMessage() {
    return {
      title: SHARE_MESSAGE,
      path: '/pages/loadingPage/main',
      imageUrl: '../../static/images/share-img.png',
    };
  },
  computed: {
    imagePDF() {
      return store.getters.selectedCenter.imagesOfPDF;
    },
  },
  methods: {
    goBack() {
      wx.navigateBack({ delta: 1 });
    },
    previewImage(e) {
      wx.previewImage({
        current: e.currentTarget.id,
        urls: this.imagePDF,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.imagePDF {
  background: black;
  height: 100vh;
  width: 100%;
}
.swiper-wrapper {
  height: 220px;
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 50%;
  transform: translateY(-50%);
}
.mySwiper {
  height: 100%;
  img {
    height: 100%;
    width: auto;
    min-width: 100%;
  }
}
swiper-item:last-child {
  padding-left: 5px;
}
</style>

