<!--
  Binding action
  With Wechat Development FW : bind{action name} ex: bindmarkertap
  With Mpvue : @{action name} ex : @markertap
-->
<template>
  <view class="page-body">
    <view class="page-section page-section-gap">
      <map
        id="myMap"
        style="width: 100%; height: 300px;"
        :markers="markers"
        show-location
        @markertap="showCenter"
        :longitude="longitude"
        :latitude="latitude"
        scale="5"
        :controls="controls"
        :polyline="polyline"
        show-compass="true"
        enable-zooms
        enable-scroll
        enable-rotate
      ></map>
    </view>
    <form @submit="formSubmit">
      <label>
        Input your location to find the closest center:
        <input
          style="border:1px solid #000;"
          name="start"
        >
      </label>
      <button form-type="submit">Find the closet center</button>
    </form>
    <view class="btn-area">
      <button @click="search()" class="page-body-button" type="primary">Search POI</button>
    </view>
    <view class="btn-area">
      <button @click="makePhoneCall()" class="page-body-button" type="primary">Make a phone call</button>
    </view>
    <view class="btn-area">
      <button
        @click="getCenterLocation()"
        class="page-body-button"
        type="primary"
      >Get Center Location</button>
      <button
        open-type="openSetting"
        @click="showCurrentGpsLocation()"
        class="page-body-button"
        type="primary"
      >Current GPS Location</button>
      <button @click="translateMarker()" class="page-body-button" type="primary">Moving annotation</button>
      <button
        @click="includePoints()"
        class="page-body-button"
        type="primary"
      >Zoom the field of view to show all latitude and longitude</button>
    </view>
  </view>
</template>

<script>
import store from "../../store/appstore";
var QQMapWX = require("../../qqmap-wx-jssdk.js");
// var qqmapsdk
var qqmapsdk = new QQMapWX({
  // key: '申请的key'
  key: "JJIBZ-24HEQ-52F5X-GSIEZ-ELWB3-FXFGN"
});

export default {
  data() {
    return {
      controls: [
        {
          id: 1,
          iconPath: "/static/images/location.png",
          position: {
            left: 0,
            top: 300 - 50,
            width: 50,
            height: 50,
          },
          clickable: true,
        }
      ],
      polyline: [
        {
          points: [],
          color: "#FF0000DD",
          width: 4,
        }
      ],
    };
  },
  // onLoad: function () {
  //   // 实例化API核心类
  //  var qqmapsdk = new QQMapWX({
  //     // key: '申请的key'
  //     key: 'JJIBZ-24HEQ-52F5X-GSIEZ-ELWB3-FXFGN'
  //   })
  // },
  onShow: function() {
    store.commit("showCurrentLocation");
  },
  onReady() {
    this.mapCtx = wx.createMapContext("myMap");
    console.log("onReady - mapCtx");
  },
  mounted() {
    console.log("mounted");
  },
  computed: {
    markers() {
      return store.state.markers;
    },
    latitude() {
      return store.state.currentLatitude;
    },
    longitude() {
      return store.state.currentLongitude;
    }
  },
  methods: {
    formSubmit(event) {
      qqmapsdk.calculateDistance({
        from: event.mp.detail.value.start || "",
        to: store.getters.allCenterLocation,
        success(res) {
          console.log(res);
          let result = res.result.elements;
          let closestCenter = result.sort((a, b) => a.distance - b.distance);
          console.log(
            "The closest center far from you : " + closestCenter[0].distance
          );
          let closestCenterInfo = store.state.markers.find(
            marker =>
              marker.latitude === closestCenter[0].to.lat &&
              marker.longitude === closestCenter[0].to.lng
          );
          console.log("The closet center is : " + closestCenterInfo.name);
        },
        fail(error) {
          console.error(error);
        }
      });
    },
    search() {
      wx.getSetting({
        success(res) {
          console.log(res.authSetting);
          if (!res.authSetting["scope.record"]) {
            console.log("scope record have been set");
            wx.authorize({
              scope: "scope.userLocation",
              success() {
                console.log("authorize success");
              },
              fail(error) {
                console.log(error);
              }
            });
          }
        }
      });
      // wx.getSetting({
      //   success (res) {
      //     console.log(res)
      //     // res.authSetting = {
      //     //   "scope.userInfo": true,
      //     //   "scope.userLocation": true
      //     // }
      //   }
      // })
      // wx.openSetting({
      //   success (res) {
      //     console.log(res)
      //     // res.authSetting = {
      //     //   "scope.userInfo": true,
      //     //   "scope.userLocation": true
      //     // }
      //   }
      // })
      wx.getLocation({
        type: "gcj02", // 返回可以用于wx.openLocation的经纬度
        success(res) {
          console.log(res);
          // const latitude = res.latitude
          // const longitude = res.longitude
          wx.openLocation({
            latitude: 39.98406,
            longitude: 116.30752,
            scale: 5,
          });
        }
      });
      // qqmapsdk.search({
      //   keyword: '酒店',
      //   success: function (res) {
      //     console.log(res)
      //     // console.log('success')
      //   },
      //   fail: function (res) {
      //     console.log(res)
      //     console.log('fail')
      //   }
      // })
    },
    showRoute(centerCoordinates) {
      var _this = this;
      qqmapsdk.direction({
        mode: "driving",
        from: {
          latitude: 31.132947630231154, // Fake current latitude
          longitude: 113.72277433984377, // Fake current longitude
        },
        to: {
          latitude: centerCoordinates.latitude,
          longitude: centerCoordinates.longitude,
        },
        success(res) {
          console.log(res);
          var ret = res;
          var coors = ret.result.routes[0].polyline;
          var pl = [];
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          for (i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i+1] });
          }
          // console.log(pl)
          // latitude:pl[0].latitude,
          // longitude:pl[0].longitude,
          // this.polyline: [{
          //   points: pl,
          //   color: '#FF0000DD',
          //   width: 4
          // }]
          _this.polyline[0].points = pl;
        },
        fail(error) {
          console.error(error);
        },
      });
    },
    makePhoneCall() {
      wx.makePhoneCall({
        phoneNumber: '1340000', // fake number phone
      });
    },
    showCenter(event) {
      let centerId = event.mp.markerId;
      store.commit('showCenter', centerId);
      // wx.navigateTo({ url: `/pages/centerInfo/main?id=${centerId}` })
      const centerSelected = store.state.markers.find(
        marker => marker.id === +centerId,
      );
      const centerCoordinates = {
        latitude: centerSelected.latitude,
        longitude: centerSelected.longitude,
      };
      this.showRoute(centerCoordinates);
    },
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success(res) {
          console.log(res.longitude);
          console.log(res.latitude);
        },
      });
    },
    showCurrentGpsLocation() {
      this.mapCtx.moveToLocation();
      store.commit('showCurrentLocation');
    },
    translateMarker() {
      this.mapCtx.translateMarker({
        markerId: 1,
        autoRotate: true,
        duration: 2000,
        destination: {
          latitude: 21.033333000000013,
          longitude: 105.85,
        },
        animationEnd() {
          console.log('animation end');
        },
      });
    },
    includePoints() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [
          {
            latitude: 38.203697,
            longitude: 115.346004,
          },
          {
            latitude: 40.730649,
            longitude: 116.939021,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.page-body-button {
  margin-top: 10px;
}
</style>