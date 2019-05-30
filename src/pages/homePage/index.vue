<template>
  <view class="page-body">
    <div>
      <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
    </div>
    <view class="map-section">
      <map
        id="myMap"
        :markers="markers"
        @markertap="showCenterInformation"
        :longitude="longitude"
        :latitude="latitude"
        :scale="scale"
        show-location
        :polyline="polyline"
        show-compass
        enable-zooms
        enable-scroll
        @tap="mapTap"
        :circles="fakeGPSLocation"
      >
        <positionInfo></positionInfo>

        <cover-view v-if="isShowGeneralIntroduction" class="generalIntroductionBar">
          <cover-view>
            <generalIntroduction></generalIntroduction>
          </cover-view>
          <cover-view>
            <navigateToDetailPage></navigateToDetailPage>
          </cover-view>
        </cover-view>

        <cover-view class="zoomBar">
          <zoomBar
            @centerCurrentLocation="centerCurrentLocation"
            @zoomInMap="zoomInMap"
            @zoomOutMap="zoomOutMap"
          ></zoomBar>
        </cover-view>

        <cover-view class="bottomBar">
          <bottomNavigation></bottomNavigation>
        </cover-view>

      </map>
    </view>
  </view>
</template>

<script>

import topNavigation from '../../components/topNavigation';
import bottomNavigation from '../../components/bottomNavigation';
import positionInfo from '../../components/positionInfo';
import generalIntroduction from '../../components/generalIntroduction';
import navigateToDetailPage from '../../components/navigateToDetailPage';
import zoomBar from '../../components/zoomBar';
import store from '../../store/appstore';
import QQMapWX from '../../qqmap-wx-jssdk';

const qqmapsdk = new QQMapWX({
  key: 'JJIBZ-24HEQ-52F5X-GSIEZ-ELWB3-FXFGN',
});

export default {
  created() {
    console.log('HomePageCreated');
  },
  onLaunch() {
    console.log('onLaunch');
  },
  onLoad() {
    console.log('onLoad');
    this.checkSystemInfo();
    this.getLocation();
    this.mapCtx = wx.createMapContext('myMap');
    this.findClosestCenter();
    this.getCenterLocation();
  },
  onShow() {
    console.log('homePageShow');
  },
  onReady() {
    console.log('ready');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  update() {
    console.log('Update');
  },
  data() {
    return {
      isDetailPageOrRoutePage: false,
      scale: '',
      polyline: [
        {
          points: [],
          color: '#008E5B',
          width: 6,
        },
      ],
      fakeGPSLocation: [
        {
          // Shanghai coordinates
          latitude: 31.2304,
          longitude: 121.4737,
          radius: 20000,
          color: '#ff0000',
          fillColor: '#b22222',
          strokeWidth: 10,
        },
      ],
    };
  },
  components: {
    topNavigation,
    positionInfo,
    bottomNavigation,
    generalIntroduction,
    navigateToDetailPage,
    zoomBar,
  },
  computed: {
    closestCenter() {
      return store.state.closestCenter;
    },
    markers() {
      return store.state.markers;
    },
    latitude() {
      return store.state.currentLatitude;
    },
    longitude() {
      return store.state.currentLongitude;
    },
    isShowGeneralIntroduction() {
      return store.state.isShowGeneralIntroduction;
    },
    statusBarHeight() {
      return store.state.statusBarHeight;
    },
  },
  methods: {
    checkSystemInfo() {
      wx.getSystemInfo({
        success(res) {
          store.commit('platformCheck', res.platform);
          store.commit('setStatusBarHeight', res.statusBarHeight);
        },
      });
    },
    getLocation() {
      console.log('getLocation');
      const that = this;
      wx.getLocation({
        type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
        success() {
          wx.getSetting({
            success() {
            },
          });
        },
        fail() {
          that.openConfirm();
        },
      });
    },
    findClosestCenter() {
      const that = this;
      console.log('findClosestCenter');
      qqmapsdk.calculateDistance({
        // from: event.mp.detail.value.start || '',
        from: {
          // Shanghai location
          latitude: 31.2304,
          longitude: 121.4737,
        },
        to: store.getters.allCenterLocation,
        success(res) {
          // console.log(res);
          const result = res.result.elements;
          store.commit('caclulateDistance', result);
          const closestCenter = result.sort((a, b) => a.distance - b.distance);
          const closestCenterInfo = store.state.markers.find(
            marker => marker.latitude === closestCenter[0].to.lat
                  && marker.longitude === closestCenter[0].to.lng,
          );
          const nearestCenter = {
            longitude: closestCenterInfo.longitude,
            latitude: closestCenterInfo.latitude,
          };
          that.showClosestCenterAround(nearestCenter);
          store.commit('setClosestCenterInfo', {
            id: closestCenterInfo.id,
            region: closestCenterInfo.region,
            city: closestCenterInfo.city,
            centerName: closestCenterInfo.centerName,
            distance: (closestCenter[0].distance / 1000).toFixed(0),
          });
          store.commit('setSelectedCenterId', closestCenterInfo.id);
        },
        fail(error) {
          console.error(error);
        },
      });
    },
    showClosestCenterAround(nearestCenter) {
      console.log('showClosestCenterAround');
      this.mapCtx.includePoints({
        padding: [50, 80, 80, 80],
        points: [
          {
            latitude: nearestCenter.latitude,
            longitude: nearestCenter.longitude,
          },
          {
            // Shanghai coordinates
            latitude: 31.2304,
            longitude: 121.4737,
          },
        ],
      });
    },
    openConfirm() {
      const that = this;
      wx.showModal({
        content: '请允许微信访问此设备的位置以获得更好的体验!',
        confirmText: '允许',
        confirmColor: '#008000',
        cancelText: '拒绝',
        success(res) {
          console.log(res);
          if (res.confirm) {
            wx.openSetting({
              success() {
                that.getLocation();
              },
            });
          } else {
            that.getLocation();
          }
        },
      });
    },
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success(res) {
          const centerLocationCoordinates = {
            longitude: res.longitude,
            latitude: res.latitude,
          };
          store.commit('setCenterLocation', centerLocationCoordinates);
        },
      });
    },
    zoomInMap() {
      const that = this;
      this.getCenterLocation();
      this.mapCtx.getScale({
        success(res) {
          console.log(res);
          that.scale = res.scale + 1;
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    zoomOutMap() {
      const that = this;
      this.getCenterLocation();
      this.mapCtx.getScale({
        success(res) {
          that.scale = res.scale - 1;
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    // showFakeLocation(coordinates) {
    //   store.commit('showFakeLocation', coordinates);
    // },
    mapTap() {
      store.commit('hideGeneralIntroduction');
    },
    showCenterInformation(event) {
      // display the Center-icon in the center of the map
      const centerId = event.mp.markerId;
      store.commit('centerTheCentre', centerId);
      store.commit('setSelectedCenterId', centerId);
      store.commit('showGeneralIntroduction');
    },
    centerCurrentLocation() {
      this.mapCtx.moveToLocation();
      store.commit('centerCurrentLocation');
    },
  },
};
</script>

<style scoped>
.page-body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.map-section {
  display: flex;
  flex-grow: 1;
  width: 100%;
}
.generalIntroductionBar {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 215px;
  /* height: 0; */
  background: rgba(255,255,255,1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.20);
  overflow: hidden;
}
.bottomBar {
  position: fixed;
  z-index: 10;
  bottom: 25px;
  left: 15px;
  right: 15px;
}
.zoomBar {
  position: fixed;
  right: 15px;
  bottom: 85px;
}
#myMap {
  position: relative;
  width: 100%;
  height: auto;
}
</style>
