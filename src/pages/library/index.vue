<template>
  <div>
    <p>This is library</p>
  </div>
</template>

<script>
// import { formatTime } from "@/utils/index";
import card from '@/components/card';

export default {
  components: {
    card,
  },

  data() {
    return {};
  },

  created() {
    console.log('Library has been created');
  },
};
</script>

<style>
</style>