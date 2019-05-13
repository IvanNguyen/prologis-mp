<template>
  <div>

    <div class="top-navigation-bar">
      <div>
        <topNavigation></topNavigation>
      </div>
    </div>

    <div class="swiper-wrapper">
      <swiper
        class="mySwiper"
        indicator-dots="true"
        indicator-active-color="#ffffff"
      >
        <block>
          <swiper-item>
            <video
            id="myVideo"
            src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
            controls
          ></video>
          </swiper-item>
        </block>
        <block>
          <swiper-item>
            <img src="../../../static/images/logistic2.jpg" alt="swiper-item">
          </swiper-item>
        </block>
        <block>
          <swiper-item>
            <img src="../../../static/images/logistic.jpg" alt="swiper-item">
          </swiper-item>
        </block>
      </swiper>
    </div>

  </div>
</template>

<script>

// import store from '../../store/appstore';
import topNavigation from '../../components/topNavigation';

export default {
  components: {
    topNavigation,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  // onReady() {
  //   const { id } = this.$root.$mp.query;
  //   // console.log(this.$root)
  //   // console.log(this.$root.$mp)
  //   this.center = store.state.markers.find(marker => marker.id === +id);
  //   console.log('center information onReady');
  // },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.swiper-wrapper {
  height: 220px;
}
.mySwiper {
  height: 100%;
}
video, img {
  height: 100%;
  width: auto;
  min-width: 100%;
}
</style>

