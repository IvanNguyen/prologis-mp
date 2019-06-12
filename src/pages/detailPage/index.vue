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
        >
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
          <!-- video -->
          <block v-if="swiperVideo">
            <swiper-item>
              <div class="picture-placeholder">
                <img src="../../../static/images/logo-no-background.png" alt="picture-placeholder">
              </div>
              <video
              id="myVideo"
              :src="swiperVideo"
              controls=true
              initial-time=1
              poster
              object-fit='cover'
              play-btn-position='center'
              >
              </video>
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

      <div v-if="!isAndroid">
        <div v-if="pdf" class="button-wrapper">
          <button @click="downloadFile" class="exportPDF" hover-class="button-hover">
            <img src="../../../static/images/PDF-icon.png" alt="PDF-icon">
            <p>详细资料下载 (PDF)</p>
          </button>
        </div>
      </div>

      <div v-else>
        <div v-if="pdf" class="button-wrapper">
          <button @click="previewPDF" class="exportPDF" hover-class="button-hover">
            <img src="../../../static/images/PDF-icon.png" alt="PDF-icon">
            <p>详细资料下载 (PDF)</p>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import store from '../../store/appstore';
import topNavigation from '../../components/topNavigation';

export default {
  components: {
    topNavigation,
  },
  data() {
    return {
      isDetailPageOrRoutePage: true,
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
    downloadFile() {
      wx.showLoading();
      wx.downloadFile({
        url: this.pdf,
        success(res) {
          const pdfFilePath = res.tempFilePath;
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: pdfFilePath,
              // fileType: 'pdf',
              success() {
                wx.hideLoading();
                console.log('open PDF success');
              },
              fail(error) {
                wx.hideLoading();
                console.log(error);
              },
            });
          } else {
            wx.hideLoading();
            wx.showModal({
              content: '下载失败',
              confirmText: '好',
              confirmColor: '#008000',
              showCancel: false,
              fail(err) {
                console.log(err);
              },
            });
          }
        },
        fail() {
          wx.hideLoading();
          wx.showModal({
            content: '下载失败',
            confirmText: '好',
            confirmColor: '#008000',
            showCancel: false,
          });
        },
      });
    },
    previewImage(e) {
      const urls = e.currentTarget.dataset.eventid === '2' ? [this.map] : this.plans;
      wx.previewImage({
        current: e.currentTarget.id,
        urls,
      });
    },
    previewPDF() {
      wx.previewImage({
        urls: this.imagesOfPDF,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import './style.scss';
</style>