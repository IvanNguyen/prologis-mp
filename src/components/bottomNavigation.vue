<template>
  <cover-view class="group-button">
    <cover-view class="button map-button" hover-class="button-hover" :disabled="disabled" >
      <cover-image src="../../static/images/map-icon.png" alt="map-icon"/>
      <cover-view class="text disabled">地图模式</cover-view>
    </cover-view>
    <cover-view @click="toListpage" class="button list-button" hover-class="button-hover">
      <cover-image src="../../static/images/list-icon.png" alt="list-icon"/>
      <cover-view class="text">列表模式</cover-view>
    </cover-view>
  </cover-view>
</template>

<script>

// import store from '../store/appstore';

export default {
  data() {
    return {
      disabled: true,
    };
  },
  methods: {
    toListpage() {
      // wx.navigateTo({ url:`/pages/centerInfo/main?id=${centerId}`})
      wx.navigateTo({ url: '/pages/listPage/main' });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.group-button {
    .button {
        display: inline-block;
        height: 45px;
        width: 50%;
        background-color: $theme-color;
        color: $text-color;
        text-align: center;
        font-size: 13px;
        font-weight: 400;
        line-height: 45px;
        box-shadow:2px 2px 0px 0px rgba(0,0,0,0.20);
    }
}
.map-button {
    border-radius: 50PX 0PX 0PX 50PX;
    cover-image {
      width: 18px;
      height: 16px;
      vertical-align: sub;
    }
    .disabled {
      display: inline;
      opacity: 0.3;
    }
    &:after {
      content: "";
      background-color: whitesmoke;
      position: absolute;
      width: 2px;
      height: 30px;
      top: 7.5px;
      left: 49.5%;
      opacity: 0.3;
      display: block;
    }
}
.list-button {
    border-radius: 0 50px 50px 0;
    cover-image {
      width: 18px;
      height: 12px;
    }
}
.text {
  display: inline;
}
cover-image {
  padding-right: 13px;
}
</style>