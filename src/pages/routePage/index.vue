<template>
  <view class="page-body">

    <div class="top-navigation-bar">
      <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
    </div>

    <view class="map-section">
      <map
        id="myMap"
        :markers="markers"
        show-location
        :longitude="longitude"
        :latitude="latitude"
        :polyline="polyline"
        enable-zooms
        enable-scroll
        :include-points="includePoints"
      >     
        <cover-view class="direction-bar">
          <directionBar></directionBar>
        </cover-view>
      </map>
    </view>
    
  </view>
</template>

<script>

import store from '../../store/appstore';
import topNavigation from '../../components/topNavigation';
import directionBar from '../../components/directionBar';
import QQMapWX from '../../qqmap-wx-jssdk';

const qqmapsdk = new QQMapWX({
  key: 'JJIBZ-24HEQ-52F5X-GSIEZ-ELWB3-FXFGN',
});

export default {
  components: {
    topNavigation,
    directionBar,
  },
  data() {
    return {
      isDetailPageOrRoutePage: true,
      polyline: [
        {
          points: [],
          color: '#008E5B',
          width: 6,
        },
      ],
      reRender: '',
    };
  },
  computed: {
    userCoordinates() {
      return store.state.userCoordinates;
    },
    markers() {
      return store.state.markers;
    },
    centerLongitude() {
      return store.getters.selectedCenter.longitude;
    },
    centerLatitude() {
      return store.getters.selectedCenter.latitude;
    },
  },
  onLoad() {
    this.mapCtx = wx.createMapContext('myMap');
    this.showRoute();
    this.zoomToView();
  },
  mounted() {
    this.reRender = 'true';
  },
  methods: {
    showRoute() {
      const that = this;
      qqmapsdk.direction({
        mode: 'driving',
        from: {
          latitude: this.userCoordinates.userLatitude,
          longitude: this.userCoordinates.userLongitude,
        },
        to: {
          latitude: this.centerLatitude,
          longitude: this.centerLongitude,
        },
        success(res) {
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
    zoomToView() {
      this.mapCtx.includePoints({
        padding: [110, 60, 120, 60],
        points: [
          {
            latitude: this.centerLatitude,
            longitude: this.centerLongitude,
          },
          {
            latitude: this.userCoordinates.userLatitude,
            longitude: this.userCoordinates.userLongitude,
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="scss">
.page-body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}
.map-section {
  flex-grow: 1;
  display: flex;
}
#myMap {
  position: relative;
  width: 100%;
  height: auto;
}
.direction-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

