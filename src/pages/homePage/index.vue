<!-- wx8921afb763fc2235 -->
<template>
  <view class="page-body">
    <div>
      <topNavigation></topNavigation>
      <positionInfo></positionInfo>
    </div>
    <div>
      <generalIntroduction v-if="isGeneralIntroduction"></generalIntroduction>
    </div>
    <view class="map-section">
      <map
        id="myMap"
        :markers="markers"
        show-location
        @markertap="showCenterInformation"
        :longitude="longitude"
        :latitude="latitude"
        :scale="scale"
        :polyline="polyline"
        show-compass="true"
        enable-zooms
        enable-scroll
        enable-rotate
        :include-points="includePoints"

      ></map>
    </view>
    <div class="bottomBar">           
      <bottomNavigation></bottomNavigation>
    </div>
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
import store from '../../store/appstore';
import QQMapWX from '../../qqmap-wx-jssdk';

const qqmapsdk = new QQMapWX({
  key: 'JJIBZ-24HEQ-52F5X-GSIEZ-ELWB3-FXFGN',
});

export default {
  created() {
    // this.findClosestCenter();
  },
  onShow() {
    // store.commit('showCurrentLocation');
  },
  onReady() {
    this.mapCtx = wx.createMapContext('myMap');
    // this.showFakeLocation([31.132947630231154, 113.72277433984377]);
  },
  mounted() {
    this.getCurrentRegion();
  },
  data() {
    return {
      scale: '',
      polyline: [
        {
          points: [],
          color: '#008E5B',
          width: 5,
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
  },
  methods: {
    showFakeLocation(coordinates) {
      store.commit('showFakeLocation', coordinates);
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
          console.log(`The closet center is : ${closestCenterInfo.name}`);
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
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success(res) {
          console.log(res.longitude);
          console.log(res.latitude);
        },
      });
    },
    showCurrentGpsLocation() {
      this.mapCtx.moveToLocation();
      store.commit('showCurrentLocation');
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
    showIncludePoints() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [
          {
            latitude: 38.203697,
            longitude: 115.346004,
          },
          {
            latitude: 40.730649,
            longitude: 116.939021,
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
/* .page-body-button {
  margin-top: 10px;
} */
.bottomBar {
  position: fixed;
  z-index: 10;
  bottom: 25px;
  left: 15px;
  right: 15px;
}
map {
  width: 100%;
  height: calc(100vh - 62PX - 80px);
}
</style>