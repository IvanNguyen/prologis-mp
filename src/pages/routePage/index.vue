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
        @markertap="showCenterInformation"
        :longitude="longitude"
        :latitude="latitude"
        :scale="scale"
        :polyline="polyline"
        show-compass
        enable-zooms
        enable-scroll
        enable-rotate
        :include-points="includePoints"
        @tap="mapTap"
      >     
        <!-- <cover-view class="bottomBar">           
          <bottomNavigation></bottomNavigation>
        </cover-view> -->
        <cover-view class="direction-bar">
          <directionBar></directionBar>
        </cover-view>
      </map>
    </view>
    
  </view>
</template>

<script>

// import store from '../../store/appstore';
import topNavigation from '../../components/topNavigation';
import directionBar from '../../components/directionBar';

export default {
  components: {
    topNavigation,
    directionBar,
  },
  data() {
    return {
      isDetailPageOrRoutePage: true,
    };
  },
  computed: {
  },
  methods: {
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

