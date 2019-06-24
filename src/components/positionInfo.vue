<template>
  <cover-view @click="showGeneralIntroClosestCenter" class="position-info-wrapper">

    <cover-view class="thumbnail-wrapper">
      <cover-image class="thumbnail" src="../../static/images/circleLogo.png" alt="Logo"/>
    </cover-view>
    
    <cover-view :class="['lh-14', 'position-info__detail']">

      <cover-view class="region-wrapper">
        <cover-view class="text">你目前的所在区域:</cover-view>
        <cover-view class="text position-info__content">{{closestCenter.region}}</cover-view>
      </cover-view>
      
      <cover-view class="address-wrapper">
        <cover-view class="text">离你最近的物业:</cover-view>
        <cover-view class="text position-info__content address">{{closestCenter.centerName}}</cover-view>
        <cover-view class="text position-info__content distance">{{closestCenter.distance}}km</cover-view>
        <cover-view class="text position__smallLogo-wrapper">
          <cover-image class="position__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/> 
        </cover-view>
      </cover-view>
      
    </cover-view>
  </cover-view>
</template>

<script>

import store from '../store/appstore';

export default {
  computed: {
    closestCenter() {
      return store.state.closestCenter;
    },
    isAndroid() {
      return store.state.isAndroid;
    },
  },
  methods: {
    showGeneralIntroClosestCenter() {
      store.commit('setSelectedCenterId', this.closestCenter.id);
      store.commit('showGeneralIntroduction');
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.position-info-wrapper {
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: $theme-color;
}
.thumbnail-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.thumbnail {
  height: 46px;
  width: 46px;
  padding: 17px 15px;
}
.region-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 3px;
}
.position-info__detail {
  flex-grow: 1;
  font-size: 13px;
  color: $button-text-color;
}
.position-info__content {
  font-weight: bold;
  padding-left: 5px;
}
.address-wrapper {
  display: flex;
  align-items: center;
}
.address {
  white-space: nowrap;
  max-width: 40%;
  overflow: hidden;
  text-overflow:ellipsis;
}
.text {
  display: inline-block;
}
.position__smallLogo {
  padding-left: 5px;
  vertical-align: sub;
}
</style>
