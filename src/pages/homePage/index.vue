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
    this.getLocation();
    this.checkSystemInfo();
    this.mapCtx = wx.createMapContext('myMap');
    this.findClosestCenter();
    this.showClosestCenterAround();
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
      // demoCenter: {
      //   latitude: 38.203697,
      //   longitude: 115.346004,
      // },
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
          latitude: 31.132947630231154,
          longitude: 113.72277433984377,
          radius: 20000,
          color: '#ff0000',
          fillColor: '#b22222',
          strokeWidth: 10,
        },
      ],
      // includePoints: [
      //   {
      //     latitude: 31.132947630231154,
      //     longitude: 113.72277433984377,
      //   },
      //   {
      //     // Center No.6
      //     latitude: 38.203697,
      //     longitude: 115.346004,
      //   },
      //   // {
      //   //   latitude: 40.730649,
      //   //   longitude: 116.939021,
      //   // },
      // ],
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
    getLocation() {
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
    checkSystemInfo() {
      wx.getSystemInfo({
        success(res) {
          store.commit('setStatusBarHeight', res.statusBarHeight);
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
    showFakeLocation(coordinates) {
      store.commit('showFakeLocation', coordinates);
    },
    mapTap() {
      store.commit('hideGeneralIntroduction');
    },
    findClosestCenter() {
      // const that = this;
      qqmapsdk.calculateDistance({
        // from: event.mp.detail.value.start || '',
        from: {
          // Fake current location
          latitude: 31.132947630231154,
          longitude: 113.72277433984377,
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
    makePhoneCall() {
      wx.makePhoneCall({
        phoneNumber: '1340000', // fake number phone
      });
    },
    showCenterInformation(event) {
      // display the Center-icon in the center of the map
      const centerId = event.mp.markerId;
      store.commit('centerTheCentre', centerId);
      // display the route from your current location to the selected center
      // const centerSelected = store.state.markers.find(
      //   marker => marker.id === +centerId,
      // );
      // const centerCoordinates = {
      //   latitude: centerSelected.latitude,
      //   longitude: centerSelected.longitude,
      // };
      // this.showRoute(centerCoordinates);
      // display the general introduction panel
      store.commit('setSelectedCenterId', centerId);
      store.commit('showGeneralIntroduction');
    },
    centerCurrentLocation() {
      this.mapCtx.moveToLocation();
      store.commit('centerCurrentLocation');
    },
    translateMarker() {
      this.mapCtx.translateMarker({
        markerId: 1,
        autoRotate: true,
        duration: 2000,
        destination: {
          latitude: 21.033333000000013,
          longitude: 105.85,
        },
        animationEnd() {
          console.log('animation end');
        },
      });
    },
    showClosestCenterAround() {
      this.mapCtx.includePoints({
        padding: [160, 40, 40, 160],
        points: [
          {
            latitude: 38.203697,
            longitude: 115.346004,
          },
          {
            latitude: 31.132947630231154,
            longitude: 113.72277433984377,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
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
  height: 100vh;
}
</style>
