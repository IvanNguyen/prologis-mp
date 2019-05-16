<template>
  <cover-view class="zoom-bar-wrapper">
    <cover-view class="button current-location-button">
      <cover-image src="../../static/images/currentLocation-icon.png" alt="current-location-icon"/>
    </cover-view>

    <cover-view class="zoom-wrapper">
      <cover-view class="button zoom-in-icon">
        <cover-image src="../../static/images/zoomIn-icon.png" alt="zoom-in-icon"/>
      </cover-view>
        <cover-view class="horizontal-line"></cover-view>
      <cover-view class="button zoom-out-icon">
        <cover-image src="../../static/images/zoomOut-icon.png" alt="zoom-out-icon"/>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
// import store from "../store/appstore";

export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "../global.scss";
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    height: 33px;
    background: rgba(255,255,255,0.66);
    cover-image {
        width: 14px;
        height: 14px;
    }
}
.current-location-button, .zoom-wrapper {
    border-radius: 5px;
}
.current-location-button {
    margin-bottom: 10px;
}
.zoom-wrapper {
    position: relative;
    .horizontal-line {
        position: absolute;
        top: 50%;
        left: 5px;
        display: block;
        height: 1px;
        width: 23px;
        background-color: #EDEDED;
    }
}
</style>
