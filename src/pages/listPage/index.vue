<template>
  <view>
    <div class="top-bar">
      <topNavigation></topNavigation>
      <positionInfo></positionInfo>
      <div class="demo">
      <div class="group-picker">

        <picker class="picker region-picker" mode="selector" @change="regionPickerChange" :value="regionIndex" :range="region">
          <div class="picker-content-wrapper">
            <view class="picker-content">
              {{region[regionIndex]}}
            </view>
            <img class="down-arrow" src="../../../static/images/down-arrow.png" alt="down-arrow">
          </div>
        </picker>

        <picker class="picker city-picker" mode="selector" @change="cityPickerChange" :value="cityIndex" :range="city">
          <div class="picker-content-wrapper">
            <view class="picker-content">
              {{city[cityIndex]}}
            </view>
            <img class="down-arrow" src="../../../static/images/down-arrow.png" alt="down-arrow">
          </div>
        </picker>

      </div>
      </div>
    </div>

    <div class="general-introduction-wrapper">
      <div
      :key="index"
      v-for="(center, index) in centers"
      class="center"
      >
        <generalIntroduction/>
      </div>
    </div>

  </view>
</template>

<script>

import topNavigation from '../../components/topNavigation';
import positionInfo from '../../components/positionInfo';
import generalIntroduction from '../../components/generalIntroduction';
import store from '../../store/appstore';

export default {
  components: {
    topNavigation,
    positionInfo,
    generalIntroduction,
  },
  data() {
    return {
      region: ['East China', 'West China', 'South China', 'North China'],
      regionIndex: 0,
      city: ['Beijing', 'Shanghai', 'Tianjin', 'Shenzhen', 'Chongqing', 'Suzhou', 'Guangzhou', 'Wuhan', 'Hangzhou'],
      cityIndex: 0,
    };
  },
  computed: {
    centers() {
      return store.state.markers;
    },
  },
  methods: {
    regionPickerChange(event) {
      this.regionIndex = event.mp.detail.value;
    },
    cityPickerChange(event) {
      this.cityIndex = event.mp.detail.value;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
.top-bar {
 position: fixed;
 top: 0;
 left: 0;
}
.group-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.demo {
  background-color: white;
}
.picker {
  width: 168px;
  margin: 0 4.5px;
  border-radius: 50px;
  background-color: white;
  border: 1px solid $theme-color;
  font-size: 13px;
  color: #333333;
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
  margin-top: calc(82PX + 80px + 80px);
  width: 100%;
}
</style>