<template>
  <div>
    <p><strong>Description : </strong></p>
    <p class="center-info">{{center.description}}</p>
    <br>
    <p><strong>Address : </strong></p>
    <p class="center-info">{{center.address}}</p>
    <br>
    <p><strong>Open time : </strong></p>
    <p class="center-info">{{center.openTime}}</p>
    <br>
    <p><strong>Phone number : </strong></p>
    <p class="center-info">{{center.phoneNumber}}</p>
    <br>
    <button class="call-button" type="primary">Call</button>
    <button type="warn">Share</button>
  </div>
</template>

<script>
// Use Vuex
// import store from './store'
import store from '../../store/appstore';

export default {
  data() {
    return {
      center: {
      },
    };
  },
  computed: {
  },
  onReady() {
    const { id } = this.$root.$mp.query;
    // console.log(this.$root)
    // console.log(this.$root.$mp)
    this.center = store.state.markers.find(marker => marker.id === +id);
    console.log('center information onReady');
  },
  methods: {
  },
};
</script>

<style scoped>
.call-button {
  margin-bottom: 10px;
  margin-top: 50px;
}
.center-info {
  color: red;
  padding-left: 10px;
}
strong {
  font-size: 18px;
}
button {
  font-size: 18px;
}
</style>

