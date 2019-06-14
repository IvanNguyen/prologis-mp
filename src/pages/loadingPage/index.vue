<template>
  <view class="page-body">
    
  </view>  
</template>

<script>

// import store from '../../store/appstore';

export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  onShow() {
    console.log('loadingPage showed');
    setTimeout(
      () => {
        wx.navigateTo({ url: '/pages/homePage/main' });
      },
      1500,
    );
  },
};
</script>

<style scoped lang="scss">
@import '../../global.scss';
.page-body {
  width: 100%;
  height: 100vh;
  background: $theme-color;
}
</style>

