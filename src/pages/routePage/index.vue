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
        :circles="fakeGPSLocation"
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
    };
  },
  computed: {
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
    console.log('RoutePageOnLoad');
    this.mapCtx = wx.createMapContext('myMap');
    this.showRoute();
    this.zoomToView();
  },
  onShow() {
    console.log('RoutePageOnShow');
    // this.showRoute();
  },
  onReady() {
    console.log('RoutePageOnReady');
  },
  beforeMount() {
    console.log('RoutePageBeforeMount');
  },
  mounted() {
    console.log('RoutePageMounted');
    console.log(this.polyline[0].points);
    this.reRender = 'true';
  },
  beforeUpdate() {
    console.log('RoutedBeforeUpdate');
    console.log(this.polyline[0].points);
    // this.showRoute();
  },
  update() {
    console.log('RouteUpdate');
    // this.showRoute();
  },
  methods: {
    showRoute() {
      console.log('showRouted');
      const that = this;
      qqmapsdk.direction({
        mode: 'driving',
        from: {
          latitude: 31.132947630231154, // Fake current latitude
          longitude: 113.72277433984377, // Fake current longitude
        },
        to: {
          latitude: this.centerLatitude,
          longitude: this.centerLongitude,
        },
        success(res) {
          console.log('success');
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
    zoomToView() {
      this.mapCtx.includePoints({
        padding: [180, 40, 40, 40],
        // padding: [200, 40, 40, 200],
        points: [
          {
            latitude: this.centerLatitude,
            longitude: this.centerLongitude,
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

<style scoped lang="scss">
#myMap {
  position: relative;
  width: 100%;
  height: 100vh;
}
.direction-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

