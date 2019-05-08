<template>
  <div>
    <div class="top-bar-placeholder"></div>
    <div class="top-navigation">
      <!-- <div class="group-button">
          <div @click="show()" class="back-button">
              B 
          </div>
          <p>|</p>
          <div class="home-button">
              H
          </div>
      </div> -->
      <p class="page-title">
        安博Prologis
      </p>
    </div>
  </div>
</template> 

<script>
export default {
//   props: ['pageTitle']
  methods: {
    show() {
      console.log('show');
    },
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.top-bar-placeholder {
  height: 40PX;
  // height: 20px;
  width: 100%;
  background-color: $theme-color;
}
.top-navigation {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42PX;
  // height: 42px;
  font-weight: bold;
  background-color: #23B2A9
}
.page-title {
    color: $text-color;
    font-size: 18PX;
    line-height: 23PX;
    font-weight: 400;
}
.back-button {
    color: white;
    background-color: #1C9790;
    border-radius: 50px 0 0 50px;
    padding: 3px 5px 3px 10px;
}
.home-button {
    color: white;
    background-color: #1C9790;
    border-radius: 0 50px 50px 0;
    padding: 3px 10px 3px 5px;
}
.group-button {
    display: flex;
    position: absolute;
    left: 12PX;
    font-size: 10px;
    height: 30PX;
    margin-top: -1PX;
    /* width: 75PX; */
}
.group-button p {
    color: white;
    font-weight: 200;
    background-color: #1C9790;
    padding-top: 3px;
}
img {
    width: 100%;
    height: 100%;
}
/* @media only screen and (min-width: 768px) {
  .page-title {
      color: red;
  }
} */
</style>
