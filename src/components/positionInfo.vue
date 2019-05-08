<template>
  <div class="position-info">
     <img class="position__logo" src="../../static/images/circleLogo.png" alt="Logo">
     <div class="position__detail">
       <p>你目前的所在区域:<span>{{currentRegion}}</span></p>
       <p>离你最近的物业<span>{{closestCenter}}</span>
       <span>{{distance}}km</span>
       <span>
         <img class="position__smallLogo" src="../../static/images/smallLocation.png" alt="smallLocation">
       </span>
       </p>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRegion: '华东区',
      closestCenter: '上海青浦物流中心',
      distance: 37,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../global.scss';
.position-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: $theme-color;
  border-top: 1px solid white;
}
.position__logo {
  height: 46px;
  width: 46px;
  padding: 0 15px;
}
.position__detail {
  font-size: 13px;
  line-height: 23px;
  color: $text-color;
  display: inline-block;
  span {
    font-weight: 500;
    padding-left: 5px;
  }
}
</style>
