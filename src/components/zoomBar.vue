<template>
  <cover-view class="zoom-bar-wrapper">
    <cover-view @click="$emit('centerCurrentLocation')" class="button current-location-button" hover-class="zoom-bar-hover">
      <cover-image src="../../static/images/currentLocation-icon.png" alt="current-location-icon"/>
    </cover-view>

    <cover-view class="zoom-wrapper">
      <cover-view @click="$emit('zoomInMap')" class="button zoom-in-icon" hover-class="zoom-bar-hover">
        <cover-image src="../../static/images/zoomIn-icon.png" alt="zoom-in-icon"/>
      </cover-view>
        <cover-view class="horizontal-line"></cover-view>
      <cover-view @click="$emit('zoomOutMap')" class="button zoom-out-icon" hover-class="zoom-bar-hover">
        <cover-image src="../../static/images/zoomOut-icon.png" alt="zoom-out-icon"/>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>

export default {
  methods: {
  },
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
    background: rgba(225, 225, 225, 0.66);
    cover-image {
        width: 14px;
        height: 14px;
    }
}
.zoom-out-icon {
  cover-image {
    width: 14px;
    height: 3px;
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
    background: rgba(225, 225, 225, 0.66);
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
