<template>
  <view>
    <view class="top-navigation-bar">
      <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
    </view>

    <view class="positionInfo-bar" :style="{ top: positionTopBar + 'PX'}">
      <view>
        <div @click="showPopUp" >
          <positionInfoListPage ></positionInfoListPage>
        </div>
        <div 
          v-if="isShowGeneralIntroduction" class="generalIntroductionBar">
          <generalIntroductionListPage
            :centerId="closestCenter.id"
            :centerName="closestCenter.centerName"
            :centerAddress="closestCenter.address"
            :centerPhoneNumber="closestCenter.phoneNumber"
            :centerArea="closestCenter.area"
            :centerDistance="closestCenter.distance"
            :centerAvatar="closestCenter.avatar"
          ></generalIntroductionListPage>
          <div class="button-row">
            <div @click="toRoutePage" class="button direction-button" hover-class="button-hover">
              <img src="../../../static/images/direction-icon.png" alt="direction-icon"/>
              <div class="text">路线</div>
            </div>
            <div @click="toDetailPage" class="button detail-button" hover-class="button-hover">
              <div class="text">详细介绍</div>
            </div>
          </div>
          <div class="popUpPlaceHolder" @click="closePopUp"></div>
        </div>
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
import navigateToDetailPage from '../../components/navigateToDetailPage';
import bottomNavigationListPage from '../../components/bottomNavigationListPage';
import store from '../../store/appstore';

export default {
  components: {
    topNavigation,
    positionInfoListPage,
    generalIntroductionListPage,
    bottomNavigationListPage,
    navigateToDetailPage,
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
    isShowGeneralIntroduction() {
      return store.state.isShowGeneralIntroduction;
    },
    closestCenter() {
      return store.state.closestCenter;
    },
    closestRegion() {
      const closestRegion = this.region
        .findIndex(region => region === this.closestCenter.region);
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
        .findIndex(city => city === this.closestCenter.city);
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
    console.log('listPage loaded');
    this.regionIndex = this.closestRegion;
    this.cityIndex = this.closestCity;
  },
  mounted() {
    console.log('mounted List Page');
  },
  methods: {
    showPopUp() {
      store.commit('showGeneralIntroduction');
      store.commit('setSelectedCenterId', this.closestCenter.id);
    },
    closePopUp() {
      store.commit('hideGeneralIntroduction');
    },
    toDetailPage() {
      wx.navigateTo({ url: '/pages/detailPage/main' });
    },
    toRoutePage() {
      wx.navigateTo({ url: '/pages/routePage/main' });
    },
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
.popUpPlaceHolder {
  width: 100%;
  height: 100vh;
}
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
    // overflow: hidden;
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
//navigateToDetailPage
.button-row {
  display: flex;
  margin-left: 15px;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: auto;
  color: $button-text-color;
  font-weight: 400;
  font-size: 13px;
  line-height: 40px;
  background-color: $theme-color;
  border-radius: 50px;
  margin: 0;
  margin-top: 6px;
  img {
    width: 24px;
    height: 24px;
    padding-right: 10px;
  }
}
.direction-button {
  width: 109px;
}
.detail-button {
  margin-left: 9px;
  width: 227px;
}
</style>
