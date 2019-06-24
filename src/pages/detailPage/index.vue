<template>
  <div>

    <div class="top-navigation-bar">
      <div>
        <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
      </div>
    </div>

    <div class="page-body" :style="{ marginTop : positionPageBody + 'PX'}">
      <div class="swiper-wrapper">
        <swiper
          class="mySwiper"
          :indicator-dots="swiperIndicatorDots"
          indicator-active-color="#ffffff"
          :current="currentItemOfSlider"
        >
          <!-- video -->
          <block v-if="swiperVideo">
            <swiper-item>
              <video
                id="myVideo"
                :src="swiperVideo"
                controls
                :poster="poster"
                object-fit='cover'
                play-btn-position='center'
              >          
                <cover-view class="poster" @click="goToNextItem">
                  <cover-image v-if="isAndroid" class="image-poster" src="../../static/images/arrow-right.png" alt="arrow-right"></cover-image>
                </cover-view>
              </video>
            </swiper-item>
          </block>  
          <!-- images -->
          <block
            :key="index"
            v-for="(image, index) in swiperImages"
          >
            <swiper-item>
              <div class="picture-placeholder">
                <img src="../../../static/images/logo-no-background.png" alt="picture-placeholder">
              </div>
              <img :src="image" alt="swiper-item">
            </swiper-item>
          </block>
        </swiper>
        
      </div>

      <div class="content-wrapper">
        <div class="description-title">
          <div class="d-flex f-grow-1">
            <p class="region content-title align-left">{{centerRegion}}</p>
            <span class="centerName content-title">{{centerName}}</span>
          </div>
          <button @click="toRoutePage" class="direction-button">
            <img src="../../../static/images/direction-icon.png" alt="direction-icon">
            <span>路线</span>
          </button>
        </div>
        <div class="content">
          <div
            v-for="(overView, index) in description.overView"
            :key="index"
          >
            <p>
              {{overView}}
            </p>
            <p class="break-line">break-line</p>
          </div>
          <p>
            {{description.accessibilities}}
          </p>
        </div>
      </div>

      <div class="content-wrapper gray-bg">
        <p class="content-title">项目平面图</p>
        <swiper
          id="plans-swiper"
          :indicator-dots="plansIndicatorDots"
          indicator-active-color="#ffffff"
        >
          <block
            :key="index"
            v-for="(plan, index) in plans"
          >
            <swiper-item>
              <div class="picture-placeholder">
                <img src="../../../static/images/logo-no-background.png" alt="picture-placeholder">
              </div>
              <img
                @click="previewImage"
                :id="plan"
                :src="plan"
                :demo="demo"
                alt="swiper-item">
            </swiper-item>
          </block>
        </swiper>
      </div>

      <div class="content-wrapper">
        <p class="content-title">周边地图与交通设施</p>
        <div class="map-wrapper">
          <div class="picture-placeholder">
            <img src="../../../static/images/logo-no-background.png" alt="picture-placeholder">
          </div>
          <img @click="previewImage" class="content-picture bit-map" :src="map" alt="bitmap">
        </div>
      </div>
      <div class="row">
        <div
          :key="index"
          v-for="(accessibility, index) in accessibilities"
          class="col content"
        >
          <p>{{accessibility.destination}}：<span>{{accessibility.distance}}公里</span></p>
        </div>
      </div>

      <div>
        <div v-if="pdf" class="button-wrapper">
          <button @click="toWebView" class="exportPDF" hover-class="button-hover">
            <img src="../../../static/images/IMG-icon.png" alt="PDF-icon">
            <p>租赁单页下载 (JPG)</p>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import store from '../../store/appstore';
import topNavigation from '../../components/topNavigation';
import { SHARE_MESSAGE } from '../../utils/constants';

export default {
  onShareAppMessage() {
    return {
      title: SHARE_MESSAGE,
      path: '/pages/loadingPage/main',
      imageUrl: '../../static/images/share-img.png',
    };
  },
  components: {
    topNavigation,
  },
  data() {
    return {
      isDetailPageOrRoutePage: true,
      current: 0,
    };
  },
  computed: {
    isAndroid() {
      return store.state.isAndroid;
    },
    positionPageBody() {
      return store.state.statusBarHeight + 42;
    },
    swiperImages() {
      return store.getters.selectedCenter.swiper.images;
    },
    swiperVideo() {
      return store.getters.selectedCenter.swiper.video;
    },
    poster() {
      return this.swiperImages[this.swiperImages.length - 1];
    },
    centerRegion() {
      return store.getters.selectedCenter.region;
    },
    centerName() {
      return store.getters.selectedCenter.centerName;
    },
    description() {
      return store.getters.selectedCenter.description;
    },
    plans() {
      return store.getters.selectedCenter.plans;
    },
    plansIndicatorDots() {
      const plansLength = store.getters.selectedCenter.plans.length;
      if (plansLength === 1) {
        return false;
      }
      return true;
    },
    swiperIndicatorDots() {
      const imageLength = store.getters.selectedCenter.swiper.images.length;
      const hasVideo = store.getters.selectedCenter.swiper.video;
      if (imageLength === 1 && hasVideo === '') {
        return false;
      }
      return true;
    },
    currentItemOfSlider() {
      return store.state.currentItemOfSlider;
    },
    map() {
      return store.getters.selectedCenter.map;
    },
    accessibilities() {
      return store.getters.selectedCenter.accessibilities;
    },
    pdf() {
      return store.getters.selectedCenter.pdf;
    },
    imagesOfPDF() {
      return store.getters.selectedCenter.imagesOfPDF;
    },
  },
  methods: {
    toWebView() {
      wx.navigateTo({ url: '/pages/webView/main' });
    },
    toRoutePage() {
      wx.navigateTo({ url: '/pages/routePage/main' });
    },
    goToNextItem() {
      store.commit('nextSliderItem');
    },
    previewImage(e) {
      console.log(e);
      const urls = e.currentTarget.dataset.eventid === '3' ? [this.map] : this.plans;
      wx.previewImage({
        current: e.currentTarget.id,
        urls,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import './style.scss';
.poster {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 25px;
}
.image-poster {
  width: 100%;
  height: 100%;
}
</style>
