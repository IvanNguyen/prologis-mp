<template>
  <div>
    <!-- <div class="top-navigation-bar">
      <div>
        <topNavigationDetailPage></topNavigationDetailPage>
      </div>
    </div> -->

    <!-- <cover-view class="top-navigation-bar test">
    </cover-view> -->

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
                <img src="../../../static/images/logo.png" alt="picture-placeholder">
              </div>
              <img :src="image" alt="swiper-item">
            </swiper-item>
          </block>
          <!-- video -->
          <block v-if="swiperVideo">
            <swiper-item>
              <div class="picture-placeholder">
                <img src="../../../static/images/logo.png" alt="picture-placeholder">
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
              <!-- <cover-view class="demo"/> -->
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
          <!-- <p>
            {{description.overView}}
          </p>
          <p class="break-line">break-line</p> -->
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
        <p class="content-title">中心平面图</p>
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
                <img src="../../../static/images/logo.png" alt="picture-placeholder">
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
            <img src="../../../static/images/logo.png" alt="picture-placeholder">
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

      <div v-if="pdf" class="button-wrapper">
        <button @click="downloadFile" class="exportPDF" hover-class="button-hover">
          <img src="../../../static/images/PDF-icon.png" alt="PDF-icon">
          <p>详细资料下载 (PDF)</p>
        </button>
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
  },
  // onReady() {
  //   const { id } = this.$root.$mp.query;
  //   // console.log(this.$root)
  //   // console.log(this.$root.$mp)
  //   this.center = store.state.markers.find(marker => marker.id === +id);
  //   console.log('center information onReady');
  // },
  methods: {
    toWebView() {
      wx.navigateTo({ url: '/pages/webView/main' });
    },
    toRoutePage() {
      wx.navigateTo({ url: '/pages/routePage/main' });
    },
    downloadFile() {
      wx.downloadFile({
        url: this.pdf,
        // url: 'https://cdn.prologis.site/images/east_china/hangzhou_renhe/prologis_hangzhou_renhe_logistics_center190220.pdf',
        success(res) {
          console.log(res);
          // const filePath = res.tempFilePath;
          // wx.showModal({
          //   content: 'success',
          //   confirmText: '允许',
          //   confirmColor: '#008000',
          //   cancelText: '拒绝',
          //   success(result) {
          //     console.log(result);
          //   },
          // });
          const pdfFilePath = res.tempFilePath;
          // wx.saveFile({
          //   tempFilePath: fileDownLoad,
          //   success(result) {
          //     console.log(result);
          //     const { savedFilePath } = res;
          //     console.log(`${savedFilePath} + saved file`);
          //   },
          //   fail(error) {
          //     console.log(error);
          //   },
          // });
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: pdfFilePath,
              // fileType: 'pdf',
              success() {
                console.log('open PDF success');
              },
              fail(error) {
                console.log(error);
              },
            });
          } else {
            wx.showModal({
              content: '下载失败',
              confirmText: '好',
              confirmColor: '#008000',
              showCancel: false,
              success(result) {
                console.log(result);
              },
            });
          }
        },
        fail(error) {
          console.log(error);
          wx.showModal({
            content: '下载失败',
            confirmText: '好',
            confirmColor: '#008000',
            showCancel: false,
            success(result) {
              console.log(result);
            },
          });
        },
      });
    },
    previewImage(e) {
      console.log(e.currentTarget);
      const urls = e.currentTarget.dataset.eventid === '2' ? [this.map] : this.plans;
      wx.previewImage({
        current: e.currentTarget.id,
        urls,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
.top-navigation-bar {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
}
// Swiper
.swiper-wrapper {
  height: 220px;
}
.mySwiper {
  height: 100%;
  video, img {
    height: 100%;
    width: auto;
    min-width: 100%;
  }
}
.picture-placeholder {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 110px !important;
    height: 110px !important;
    min-width: unset;
  }
}
//Content
.content-wrapper {
  padding: 30px 15px;
}
.description-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.content-title {
  font-size: 18px;
  font-weight: bold;
  color: $detail-content-title;
  line-height: 25px;
  text-align: center;
  margin-bottom: 20px;
}
.region {
  flex-shrink: 0 !important;
  padding-right: 7px;
}
.centerName {
  margin-bottom: 0;
  text-align: left;
}
.align-left {
  text-align: left !important;
  margin: 0 !important;
}
//button direction
.direction-button {
  width: 89px;
  height: 30px;
  display: flex;
  flex-shrink: 0;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: $theme-color;
  margin: 0;
  img {
    display: block;
    width: 18px;
    height: 18px;
  }
  span {
    padding-left: 6px;
    color: $button-text-color;
    font-size: 13px;
    line-height: 18px;
  }
}
//
.content {
  font-size: 13px;
  line-height: 23px;
  color: $content-text-color;
}
.break-line {
  visibility: hidden;
}
.gray-bg {
  background-color: #F8F8F8;
}
#plans-swiper {
  height: 185px;
  img {
    width: 100%;
    height: 100%;
  }
}
.content-picture {
  width: 100%;
  height: 100%;
}
.map-wrapper {
  height: 220px;
  position: relative;
}
.bit-map {
  margin-bottom: -10px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px;
  padding-bottom: 30px;
}
.col {
  flex: 50%;
  max-width: 50%;
}
//export PDF button
.button-wrapper {
  padding-bottom: 30px;
}
.exportPDF {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 345px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50px;
  background-color: $theme-color;
  img {
    display: block;
    width: 18px;
    height: 18px;
  }
  p {
    padding-left: 6px;
    font-size: 13px;
    color: $button-text-color;
    line-height: 18px;
  }
}
</style>

