<template>
  <view>
    <view class="top-navigation-bar">
      <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
    </view>

    <view class="positionInfo-bar" :style="{ top: positionTopBar + 'PX'}">
      <view>
        <positionInfoListPage></positionInfoListPage>
      </view>
    </view>

    <div class="group-picker" :style="{ top: positionGroupPicker + 'PX'}">
      <picker class="picker region-picker" mode="selector" @change="regionPickerChange" :value="regionIndex" :range="region">
        <div class="picker-content-wrapper">
          <view class="picker-content">
            {{region[regionIndex]}}
          </view>
          <img class="down-arrow" src="../../../static/images/down-arrow.png" alt="down-arrow">
        </div>
      </picker>

      <picker class="picker city-picker" mode="selector" @change="cityPickerChange" :value="cityIndex" :range="cityInSelectedRegion">
        <div class="picker-content-wrapper">
          <view class="picker-content">
            {{cityInSelectedRegion[cityIndex]}}
          </view>
          <img class="down-arrow" src="../../../static/images/down-arrow.png" alt="down-arrow">
        </div>
      </picker>
    </div>

    <div class="general-introduction-wrapper" :style="{ marginTop : positionGeneralIntro + 'PX'}">
      <div
      :key="index"
      v-for="(center, index) in centers"
      class="center"
      >
        <view>
          <generalIntroductionListPage/>
        </view>
      </div>
    </div>

    <view class="bottomNavigation-bar">
      <bottomNavigationListPage></bottomNavigationListPage>
    </view>
  </view>
</template>

<script>

import topNavigation from '../../components/topNavigation';
import positionInfoListPage from '../../components/positionInfoListPage';
import generalIntroductionListPage from '../../components/generalIntroductionListPage';
import bottomNavigationListPage from '../../components/bottomNavigationListPage';
import store from '../../store/appstore';

export default {
  components: {
    topNavigation,
    positionInfoListPage,
    generalIntroductionListPage,
    bottomNavigationListPage,
  },
  data() {
    return {
      isDetailPageOrRoutePage: false,
      region: ['West China', 'East China', 'South China', 'North China'],
      regionIndex: '',
      cityInEastChina: ['Shanghai', 'Suzhou', 'Kunshan', 'Wuxi', 'Nanjing', 'Hangzhou', 'Huzhou', 'Jiaxing', 'Wuhan'],
      cityInNorthChina: ['Beijing', 'Tianjin', 'Shenyang', 'Jinan'],
      cityInWestChina: ['Chengdu', 'Chongqing', 'Xian'],
      cityInSouthChina: ['Guangzhou', 'Fushan', 'Dongwan', 'Huizhou'],
      cityIndex: 0,
    };
  },
  computed: {
    closestRegion() {
      const closestRegion = this.region
        .findIndex(region => region === store.state.closestCenter.region);
      return closestRegion;
    },
    regionSelected() {
      return this.region[this.regionIndex];
    },
    cityInSelectedRegion() {
      switch (this.regionSelected) {
        case 'West China':
          return this.cityInWestChina;
        case 'East China':
          return this.cityInEastChina;
        case 'South China':
          return this.cityInSouthChina;
        case 'North China':
          return this.cityInNorthChina;
        default:
          return null;
      }
    },
    closestCity() {
      const closestCity = this.cityInSelectedRegion
        .findIndex(city => city === store.state.closestCenter.city);
      return closestCity;
    },
    centers() {
      return store.state.markers;
    },
    positionTopBar() {
      return store.state.statusBarHeight + 42;
    },
    positionGroupPicker() {
      return store.state.statusBarHeight + 42 + 80;
    },
    positionGeneralIntro() {
      return store.state.statusBarHeight + 42 + 80 + 80;
    },
  },
  onLoad() {
    this.regionIndex = this.closestRegion;
    this.cityIndex = this.closestCity;
  },
  mounted() {
    console.log('mounted List Page');
  },
  methods: {
    regionPickerChange(event) {
      this.regionIndex = event.mp.detail.value;
      this.cityIndex = 0;
    },
    cityPickerChange(event) {
      this.cityIndex = event.mp.detail.value;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
.positionInfo-bar {
  position: fixed;
  left: 0;
  right: 0;
}
.group-picker {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  background-color: $theme-bg;
}
.picker {
  width: 168px;
  margin: 0 4.5px;
  border-radius: 50px;
  background-color: white;
  border: 1px solid $theme-color;
  font-size: 13px;
  color: #333333;
  &:hover {
    color: $theme-color !important;
    background-color: whitesmoke !important;
  }
}
.picker-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 128px;
  height: 40px;
  margin: 0 auto;
}
.down-arrow {
  width: 16px;
  height: 10px;
}
// general-introduction
.general-introduction-wrapper {
  padding-bottom: 95px;
  width: 100%;
}
.bottomNavigation-bar {
  display: block;
  position: fixed;
  bottom: 25px;
  left: 15px;
  right: 15px;
}
</style>
