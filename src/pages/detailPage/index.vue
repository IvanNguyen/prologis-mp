<template>
  <div>
    <!-- <cover-view class="top-navigation-bar">
      <cover-view>
        <topNavigationDetailPage></topNavigationDetailPage>
      </cover-view>
    </cover-view> -->
    <div class="top-navigation-bar">
      <div>
        <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
      </div>
    </div>

    <!-- <cover-view class="test">
      
    </cover-view> -->

    <div class="page-body" :style="{ marginTop : positionPageBody + 'PX'}">
      <div class="swiper-wrapper">
        <swiper
          class="mySwiper"
          indicator-dots="true"
          indicator-active-color="#ffffff"
        >
          <block>
            <swiper-item>
              <img @click="previewImage" src="../../../static/images/logistic2.jpg" alt="swiper-item">
            </swiper-item>
          </block>
          <block>
            <swiper-item>
              <img src="../../../static/images/logistic.jpg" alt="swiper-item">
            </swiper-item>
          </block>
          <block>
            <swiper-item>
              <video
              id="myVideo"
              src="https://cdn.prologis.site/Videos/Pologis%20Gedian%20Logistics%20Center.mp4"
              controls=true
              initial-time=1
              poster=''
              object-fit='cover'
              play-btn-position='center'
            >
              <!-- <cover-view class="top-navigation-baz">
                <topNavigationDetailPage></topNavigationDetailPage>
              </cover-view>   -->
            </video>
            </swiper-item>
          </block>
        </swiper>
      </div>

      <div class="content-wrapper">
        <div class="description-title">
          <p class="content-title align-left">{{centerRegion}} <span>{{centerName}}</span></p>
          <button @click="toRoutePage" class="direction-button">
            <img src="../../../static/images/direction-icon.png" alt="direction-icon">
            <span>路线</span>
          </button>
        </div>
        <div class="content">
          <p>
            该现代化物流园各由一栋单层和双层建筑组成，可租赁面积81,800平方米，先后于2011年和2013年竣工。周边地区均为制造业建筑，限制了新仓库的建设。现代化设计包括早期快速响应灭火喷头系统，属于理想的仓储设施。
          </p>
          <p class="break-line">break-line</p>
          <p>
            该配送中心距G1501高速仅0.5公里，距S26高速5公里，距G2高速12公里，距上海虹桥机场也仅15公里。
          </p>
        </div>
      </div>

      <div class="content-wrapper gray-bg">
        <p class="content-title">中心平面图</p>
        <img class="content-picture" src="../../../static/images/diagram.png" alt="diagram-image"/>
      </div>

      <div class="content-wrapper">
        <p class="content-title">周边地图与交通设施</p>
        <img class="content-picture bit-map" src="../../../static/images/bitmap.png" alt="bitmap">
      </div>

      <div class="row">
        <div class="col content">
          <p>距苏州市区：<span>15公里</span></p>
          <p>距苏州工业园区：<span>20公里</span></p>
        </div>
        <div class="col content">
          <p>距苏州新区高铁：<span>5公里</span></p>
          <p>距上海虹桥机场：<span>90公里</span></p>
        </div>
      </div>

      <div class="button-wrapper">
        <button @click="toWebView" class="exportPDF" hover-class="button-hover">
          <img src="../../../static/images/PDF-icon.png" alt="PDF-icon">
          <p>详细资料下载 (PDF)</p>
        </button>
      </div>
      <!-- <web-view src="https://prologis.getbynder.com/m/5976be5f14c48140/original/Prologis-Shanghai-Qingpu-Distribution-Center-190220.pdf"></web-view> -->
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
    centerRegion() {
      return store.getters.selectedCenter.region;
    },
    centerName() {
      return store.getters.selectedCenter.centerName;
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
        url: 'https://cdn.prologis.site/PDF/Prologis%20Shanghai%20Qingpu%20Distribution%20Center%20190220.pdf',
        // url: 'https://calibre-ebook.com/downloads/demos/demo.docx',
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
          wx.openDocument({
            filePath: pdfFilePath,
            fileType: 'pdf',
            success() {
              console.log('open PDF success');
            },
            fail(error) {
              console.log(error);
            },
          });
        },
        fail(error) {
          console.log(error);
          wx.showModal({
            content: 'error',
            confirmText: '允许',
            confirmColor: '#008000',
            cancelText: '拒绝',
            success(result) {
              console.log(result);
            },
          });
        },
      });
    },
    previewImage(e) {
      // const { value } = this.relationships.field_carousel;
      // const urls = value.map(item => item.attributes.uri.previewUrl);
      wx.previewImage({
        current: 'https://media.alienwarearena.com/media/1327-a.jpg',
        urls: ['http://personal.psu.edu/xqz5228/jpg.jpg', 'https://media.alienwarearena.com/media/1327-a.jpg', 'http://www.haogongzhang.com/Uploads/baike/201406/53916cf3bc8f1.jpg'],
      });
      console.log(e.currentTarget);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
// Top navigation bar
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
//Content
.content-wrapper {
  padding: 30px 15px;
}
.description-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.align-left {
  text-align: left !important;
  margin: 0 !important;
}
//button direction
.direction-button {
  widows: 89px;
  height: 30px;
  display: flex;
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
.content-picture {
  width: 100%;
}
.bit-map {
  margin-bottom: -10px;
}
.row {
  display: flex;
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

