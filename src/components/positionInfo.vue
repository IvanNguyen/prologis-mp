<template>
  <cover-view class="position-info-wrapper">

    <cover-view class="thumbnail-wrapper">
      <cover-image class="thumbnail" src="../../static/images/circleLogo.png" alt="Logo"/>
    </cover-view>
    
    <cover-view class="position-info__detail">

      <cover-view class="region-wrapper">
        <cover-view class="text">你目前的所在区域:</cover-view>
        <cover-view class="text position-info__content">{{currentRegion}}</cover-view>
      </cover-view>
      
      <cover-view class="address-wrapper">
        <cover-view class="text">离你最近的物业:</cover-view>
        <cover-view class="text position-info__content address">{{closestCenter}}</cover-view>
        <cover-view class="text position-info__content distance">{{distance}}km</cover-view>
        <cover-view class="text position__smallLogo-wrapper">
          <cover-image class="position__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation-icon"/> 
        </cover-view>
      </cover-view>
      
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  data() {
    return {
      currentRegion: '华东区',
      closestCenter: '上海青浦物流中心',
      distance: 37,
    };
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
.thumbnail {
  height: 46px;
  width: 46px;
  padding: 17px 15px;
}
.position-info__detail {
  flex-grow: 1;
  font-size: 13px;
  line-height: 23px;
  color: $text-color;
}
.position-info__content {
  font-weight: bold;
  padding-left: 5px;
}
.address {
  white-space: nowrap;
  max-width: 140px;
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
