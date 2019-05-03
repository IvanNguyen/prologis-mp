<template>
  <div>
    <!-- <div class="button-group">
        <button>
            <img src="../../static/images/arrow.png" alt="back button">
        </button>
        <button>H</button>
    </div> -->
    <div class="topBarPlaceholder"></div>
    <div class="topNavigation">
      <div class="group-button">
          <div @click="show()" class="back-button">
              B 
          </div>
          <p>|</p>
          <div class="home-button">
              H
          </div>
      </div>
      <p class="pageTitle">
        Prologis
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

<style>
.topNavigation {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px; */
  /* padding-left: 0; */
  /* width: 100%; */
  height: 45PX;
  font-weight: bold;
  background-color: #23B2A9
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
.pageTitle {
    color: white;
    font-size: 16PX;
    height: 50PX;
    line-height: 50PX;
}
.hidden-text {
    color: brown;
}
.topBarPlaceholder {
  height: 20PX;
  width: 100%;
  background-color: red;
}
img {
    width: 100%;
    height: 100%;
}
/* @media only screen and (min-width: 768px) {
  .pageTitle {
      color: red;
  }
} */
</style>
