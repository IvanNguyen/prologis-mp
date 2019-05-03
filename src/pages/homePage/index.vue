<template>
  <div @click="clickHandle">
    <topNavigation/>
    <button>Demo Button</button>
    <div class="userinfo">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      >
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover">

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <a href="http://maps.apple.com/?q=Mexican+Restaurant" class="map">Open Apple Map Demo</a>
    <a href="/pages/map/main" class="map">Map</a>
    <a href="/pages/library/main" class="library">Library</a>
    <a href="/pages/centerInfo/main" class="center-info">Center Information</a>
  </div>
</template>

<script>
// import card from "@/components/card";
import card from '../../components/card';
import topNavigation from '../../components/topNavigation';

export default {
  data() {
    return {
      userInfo: {
        nickName: 'Hello World',
        avatarUrl: 'http://mpvue.com/assets/logo.png',
      },
    };
  },

  onPullDownRefresh() {
    console.log('onPullDownRefresh');
  },

  components: {
    card, topNavigation,
  },

  methods: {
    // bindViewTap () {
    //   const url = '../logs/main'
    //   if (mpvuePlatform === 'wx') {
    //     mpvue.switchTab({ url })
    //     // wx.switchTab({ url })
    //   } else {
    //     mpvue.navigateTo({ url })
    //     console.log('we.navigateTo{{ url }}')
    //   }
    // },
    clickHandle(ev) {
      console.log('clickHandle: ', ev);
      // throw {message: 'custom test'}
    },
  },

  created() {
    // let app = getApp()
  },
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
