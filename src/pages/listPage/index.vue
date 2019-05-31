<template>
  <view>
    <view class="top-navigation-bar">
      <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
    </view>

    <view class="positionInfo-bar" :style="{ top: positionTopBar + 'PX'}">
      <view>
        <positionInfoListPage></positionInfoListPage>
        <div class="group-picker">
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
      </view>
    </view>

    <div class="general-introduction-wrapper">
      <view :style="{ padding: topNavigationBarPlaceholder + 'PX'}"/>
      <view class="positionInfo-bar-placeholder"/>
      <view>
        <generalIntroductionListPage
          :key="index"
          v-for="(center, index) in centers"
          :centerId="center.id"
          :centerName="center.centerName"
          :centerAddress="center.address"
          :centerPhoneNumber="center.phoneNumber"
          :centerArea="center.area"
          :centerDistance="center.distance"
          :centerAvatar="center.avatar"
        />
      </view>
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
      region: ['华西区', '华东区', '华南区', '华北区'],
      regionIndex: '',
      cityInEastChina: ['上海', '苏州', '昆山', '无锡', '南京', '杭州', '湖州', '嘉兴', '武汉'],
      cityInNorthChina: ['北京', '天津', '沈阳', '济南'],
      cityInWestChina: ['成都', '重庆', '西安'],
      cityInSouthChina: ['广州', '佛山', '东莞', '惠州'],
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
        case '华西区':
          return this.cityInWestChina;
        case '华东区':
          return this.cityInEastChina;
        case '华南区':
          return this.cityInSouthChina;
        case '华北区':
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
      return store.getters.centerFilter;
    },
    positionTopBar() {
      return store.state.statusBarHeight + 42;
    },
    topNavigationBarPlaceholder() {
      return (store.state.statusBarHeight + 42) / 2;
    },
  },
  onLoad() {
    this.regionIndex = this.closestRegion;
    this.cityIndex = this.closestCity;
  },
  mounted() {
    console.log('mounted List Page');
    console.log(this.centers);
  },
  methods: {
    regionPickerChange(event) {
      this.regionIndex = event.mp.detail.value;
      this.cityIndex = 0;
      store.commit('setCityFilter', this.cityInSelectedRegion[0]);
    },
    cityPickerChange(event) {
      this.cityIndex = event.mp.detail.value;
      store.commit('setCityFilter', this.cityInSelectedRegion[event.mp.detail.value]);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
.top-navigation-bar {
    z-index: 10;
}
.positionInfo-bar-placeholder {
  padding: 81px 0; 
}
.positionInfo-bar {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
}
.group-picker {
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
  padding-bottom: 90px;
  width: 100%;
}
.bottomNavigation-bar {
  display: block;
  position: fixed;
  bottom: 25px;
  left: 15px;
  right: 15px;
  z-index: 10;
}
</style>
