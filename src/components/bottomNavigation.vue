<template>
  <cover-view class="group-button">
    <button class="map-button" hover-class="button-hover" :disabled="disabled" >
      <cover-image src="../../static/images/map-icon.png" alt="map-icon"/>
      <span>地图模式</span>
    </button>
    <button @click="toListpage" class="list-button" hover-class="button-hover">
      <cover-image src="../../static/images/list-icon.png" alt="list-icon"/>
      <span>列表模式</span>
    </button>
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
    button {
        display: inline-block;
        height: 45px;
        width: 50%;
        background-color: $theme-color;
        color: $text-color;
        font-size: 13px;
        font-weight: 400;
        line-height: 45px;
        box-shadow:2px 2px 0px 0px rgba(0,0,0,0.20);
    }
}
.map-button {
    border-radius: 50px 0 0 50px;
    cover-image {
      width: 18px;
      height: 16px;
      vertical-align: sub;
    }
    span {
      opacity: 0.3;
    }
    &:after {
      content: "";
      background-color: whitesmoke;
      position: absolute;
      width: 2px;
      height: 45px;
      top: 10px;
      left: 99.5%;
      opacity: 0.3;
      display: block;
    }
}
.vertical-line {
    border-radius: 0;
    width: 10%;
    padding: 0;
    cover-image {
      width: 0.5px;
      height: 25px;
      padding-right: 0.5px;
      margin-top: 10px;
    }
}
.list-button {
    border-radius: 0 50px 50px 0;
    cover-image {
      width: 18px;
      height: 12px;
    }
}
cover-image {
  display: inline-block;
  padding-right: 13px;
}
</style>