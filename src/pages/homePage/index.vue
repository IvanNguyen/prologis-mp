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

        <cover-view v-if="isGeneralIntroduction" class="generalIntroductionBar">
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
    <!-- <form @submit="formSubmit">
      <label>
        Input your location to find the closest center:
        <input
          style="border:1px solid #000;"
          name="start"
        >
      </label>
      <button form-type="submit">Find the closet center</button>
    </form>
    <view class="btn-area">
      <button @click="search()" class="page-body-button" type="primary">Search POI</button>
    </view>
    <view class="btn-area">
      <button @click="makePhoneCall()" class="page-body-button" type="primary">Make a phone call</button>
    </view>
    <view class="btn-area">
      <button
        @click="getCenterLocation()"
        class="page-body-button"
        type="primary"
      >Get Center Location</button>
      <button
        open-type="openSetting"
        @click="showCurrentGpsLocation()"
        class="page-body-button"
        type="primary"
      >Current GPS Location</button>
      <button @click="translateMarker()" class="page-body-button" type="primary">Moving annotation</button>
      <button
        @click="includePoints()"
        class="page-body-button"
        type="primary"
      >Zoom the field of view to show all latitude and longitude</button>
    </view> -->
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
    console.log('created');
  },
  onLoad() {
    console.log('onLoad');
    this.checkSystemInfo();
    this.mapCtx = wx.createMapContext('myMap');
    this.findClosestCenter();
    this.showClosestCenterAround();
    this.getCenterLocation();
  },
  onShow() {
    console.log('show');
    // this.showRoute(this.demoCenter);
    // this.showClosestCenterAround();
    // this.getCenterLocation();
    // store.commit('showCurrentLocation');
  },
  onReady() {
    console.log('ready');
    // this.getCurrentRegion();
    // this.mapCtx = wx.createMapContext('myMap');
    // this.showFakeLocation([31.132947630231154, 113.72277433984377]);
  },
  mounted() {
    console.log('mounted');
    // this.getCurrentRegion();
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
      includePoints: [
        {
          latitude: 31.132947630231154,
          longitude: 113.72277433984377,
        },
        {
          // Center No.6
          latitude: 38.203697,
          longitude: 115.346004,
        },
        // {
        //   latitude: 40.730649,
        //   longitude: 116.939021,
        // },
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
    markers() {
      return store.state.markers;
    },
    latitude() {
      return store.state.currentLatitude;
    },
    longitude() {
      return store.state.currentLongitude;
    },
    isGeneralIntroduction() {
      return store.state.isGeneralIntroduction;
    },
    statusBarHeight() {
      return store.state.statusBarHeight;
    },
  },
  methods: {
    checkSystemInfo() {
      wx.getSystemInfo({
        success(res) {
          console.log(res);
          store.commit('getStatusBarHeight', res.statusBarHeight);
          // console.log(res.model);
          // console.log(res.pixelRatio);
          // console.log(res.windowWidth);
          // console.log(res.windowHeight);
          // console.log(res.language);
          // console.log(res.version);
          // console.log(res.platform);
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
      const that = this;
      qqmapsdk.calculateDistance({
        // from: event.mp.detail.value.start || '',
        from: {
          // Fake current location
          latitude: 31.132947630231154,
          longitude: 113.72277433984377,
        },
        to: store.getters.allCenterLocation,
        success(res) {
          console.log(res);
          const result = res.result.elements;
          const closestCenter = result.sort((a, b) => a.distance - b.distance);
          const closestCenterCoordinates = {
            latitude: closestCenter[0].to.lat,
            longitude: closestCenter[0].to.lng,
          };
          that.includePoints.push(closestCenterCoordinates);
          console.log(`The closest center far from you : ${closestCenter[0].distance}`);
          const closestCenterInfo = store.state.markers.find(
            marker => marker.latitude === closestCenter[0].to.lat
                  && marker.longitude === closestCenter[0].to.lng,
          );
          console.log(`The closet center is : ${closestCenterInfo.centerName}`);
          store.commit('setClosestCenterInfo', {
            region: closestCenterInfo.region,
            city: closestCenterInfo.city,
            centerName: closestCenterInfo.centerName,
            distance: (closestCenter[0].distance / 1000).toFixed(0),
          });
        },
        fail(error) {
          console.error(error);
        },
      });
    },
    search() {
      wx.getSetting({
        success(res) {
          console.log(res.authSetting);
          if (!res.authSetting['scope.record']) {
            console.log('scope record have been set');
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                console.log('authorize success');
              },
              fail(error) {
                console.log(error);
              },
            });
          }
        },
      });
      wx.getLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success(res) {
          console.log(res);
          // const latitude = res.latitude
          // const longitude = res.longitude
          wx.openLocation({
            latitude: 39.98406,
            longitude: 116.30752,
            scale: 5,
          });
        },
      });
    },
    showRoute(centerCoordinates) {
      const that = this;
      qqmapsdk.direction({
        mode: 'driving',
        from: {
          latitude: 31.132947630231154, // Fake current latitude
          longitude: 113.72277433984377, // Fake current longitude
        },
        to: {
          latitude: centerCoordinates.latitude,
          longitude: centerCoordinates.longitude,
        },
        success(res) {
          console.log(res);
          const ret = res;
          const coors = ret.result.routes[0].polyline;
          const pl = [];
          const kr = 1000000;
          for (let i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          for (let i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] });
          }
          that.polyline[0].points = pl;
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
        padding: [160],
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
    getCurrentRegion() {
      this.mapCtx.getRegion({
        success(res) {
          console.log(res);
        },
        fail(error) {
          console.log(error);
        },
      });
      this.mapCtx.getScale({
        success(res) {
          console.log(res);
        },
        fail(error) {
          console.log(error);
        },
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