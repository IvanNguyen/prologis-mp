<template>
  <cover-view class="position-info">
    <cover-view>
      <cover-image class="position__logo" src="../../static/images/circleLogo.png" alt="Logo"/>
    </cover-view>
    <cover-view class="position__detail">
      <cover-view>
        <cover-view class="text">
          你目前的所在区域:
          <cover-view class="position__content">{{currentRegion}}</cover-view>
        </cover-view>
      </cover-view>
      
        <cover-view class="text">
          <cover-view class="position__content">离你最近的物业:</cover-view>
          <cover-view class="position__content address">{{closestCenter}}</cover-view>
          <cover-view class="position__content far">{{distance}}km</cover-view>
          <!-- <cover-image class="position__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation"/>  -->
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
.position-info {
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: $theme-color;
}
.position__logo {
  height: 46px;
  width: 46px;
  padding: 17px 15px;
}
.position__detail {
  font-size: 13px;
  line-height: 23px;
  color: $text-color;
}
.position__content {
  display: inline-block;
  font-weight: 500;
  padding-left: 5px;
}
.address {
  width: 50px;
  white-space: normal;
}
.far {
  // display: inline !important;
}
.text {
  white-space: normal;
}
</style>
