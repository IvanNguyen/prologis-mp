<template>
  <view class="page-body">

    <div class="top-navigation-bar">
      <topNavigation></topNavigation>
    </div>

    <!-- <view class="map-section">
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
        @tap="mapTap"
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
        <cover-view class="bottomBar">           
          <bottomNavigation></bottomNavigation>
        </cover-view>
      </map>
    </view> -->
    
  </view>
</template>

<script>

// import store from '../../store/appstore';
import topNavigation from '../../components/topNavigation';

export default {
  components: {
    topNavigation,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.top-navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>

