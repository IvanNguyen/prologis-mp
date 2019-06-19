<template>
  <div>
    <div class="top-bar-placeholder" :style="{ height: statusBarHeight + 'PX'}"></div>
    <div class="top-navigation">
      <div v-if="detailPage" :class="[
        isAndroid ? 'androidButtonPosition' : 'iosButtonPosition',
        'back-and-home-button']">
        <backAndHomeButton></backAndHomeButton>
      </div>
      <p class="page-title">
        安博Prologis
      </p>
    </div>
  </div>
</template> 

<script>

import backAndHomeButton from './backAndHomeButton';
import store from '../store/appstore';

export default {
  props:
  [
    'detailPage',
  ],
  computed: {
    statusBarHeight() {
      return store.state.statusBarHeight;
    },
    isAndroid() {
      return store.state.isAndroid;
    },
  },
  components: {
    backAndHomeButton,
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.top-bar-placeholder {
  width: 100%;
  background-color: $theme-color;
}
.top-navigation {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42PX;
  font-weight: bold;
  background-color: #23B2A9
}
.page-title {
  color: $button-text-color;
  font-size: 18PX;
  line-height: 23PX;
  font-weight: 400;
}
.back-and-home-button {
  position: absolute;
}
.androidButtonPosition {
  left: 10PX;
  bottom: 3px;
}
.iosButtonPosition {
  left: 10PX;
  bottom: 7px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
