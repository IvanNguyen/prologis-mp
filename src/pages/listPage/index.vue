<template>
  <view>
    <div>
      <topNavigation></topNavigation>
      <positionInfo></positionInfo>
    </div>
  </view>
</template>

<script>

import topNavigation from '../../components/topNavigation';
import positionInfo from '../../components/positionInfo';

export default {
  data() {
    return {};
  },
  components: {
    topNavigation,
    positionInfo,
  },
};
</script>

<style>
</style>