<template>
  <view class="page-body">
    <div>
      <topNavigation :detailPage="isDetailPageOrRoutePage" ></topNavigation>
    </div>
    <view class="map-section">
      <map
        id="myMap"
        :markers="markers"
        @markertap="showCenterInformation"
        :longitude="longitude"
        :latitude="latitude"
        :scale="scale"
        show-location
        :polyline="polyline"
        show-compass
        enable-zooms
        enable-scroll
        @tap="mapTap"
      >
        <positionInfo></positionInfo>

        <cover-view v-if="isShowGeneralIntroduction" class="generalIntroductionBar">
          <cover-view>
            <generalIntroduction></generalIntroduction>
          </cover-view>
          <cover-view>
            <navigateToDetailPage></navigateToDetailPage>
          </cover-view>
        </cover-view>

        <cover-view class="zoomBar">
          <zoomBar
            @centerCurrentLocation="centerCurrentLocation"
            @zoomInMap="zoomInMap"
            @zoomOutMap="zoomOutMap"
          ></zoomBar>
        </cover-view>

        <cover-view class="bottomBar">
          <bottomNavigation></bottomNavigation>
        </cover-view>

      </map>
    </view>
  </view>
</template>

<script>

import topNavigation from '../../components/topNavigation';
import bottomNavigation from '../../components/bottomNavigation';
import positionInfo from '../../components/positionInfo';
import generalIntroduction from '../../components/generalIntroduction';
import navigateToDetailPage from '../../components/navigateToDetailPage';
import zoomBar from '../../components/zoomBar';
import store from '../../store/appstore';
import QQMapWX from '../../qqmap-wx-jssdk';
import { SHARE_MESSAGE } from '../../utils/constants';

const qqmapsdk = new QQMapWX({
  key: 'JJIBZ-24HEQ-52F5X-GSIEZ-ELWB3-FXFGN',
});

export default {
  onShareAppMessage() {
    return {
      title: SHARE_MESSAGE,
      path: '/pages/loadingPage/main',
      imageUrl: '../../static/images/share-img.png',
    };
  },
  onLoad() {
    this.checkSystemInfo();
    this.mapCtx = wx.createMapContext('myMap');
    this.getLocation();
    this.getCenterLocation();
  },
  beforeMount() {
    this.autoUpdate();
  },
  data() {
    return {
      isDetailPageOrRoutePage: false,
      scale: '',
      polyline: [
        {
          points: [],
          color: '#008E5B',
          width: 6,
        },
      ],
    };
  },
  components: {
    topNavigation,
    positionInfo,
    bottomNavigation,
    generalIntroduction,
    navigateToDetailPage,
    zoomBar,
  },
  computed: {
    userCoordinates() {
      return store.state.userCoordinates;
    },
    closestCenter() {
      return store.state.closestCenter;
    },
    markers() {
      return store.state.markers;
    },
    latitude() {
      return store.state.mapLatitude;
    },
    longitude() {
      return store.state.mapLongitude;
    },
    isShowGeneralIntroduction() {
      return store.state.isShowGeneralIntroduction;
    },
    statusBarHeight() {
      return store.state.statusBarHeight;
    },
  },
  methods: {
    autoUpdate() {
      const self = this;
      // Get the applet update mechanism compatible with
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        // 1. Check if the applet has a new version released
        updateManager.onCheckForUpdate(res => {
          // Request callback for new version information
          if (res.hasUpdate) {
            // detect new Version, need to be updated, give the prompt
            wx.showModal({
              title: '立即升级',
              content:
                '版本已升级，是否重启使用? ',
              success(result) {
                if (result.confirm) {
                  // 2. The user determines to download the update applet,
                  // the applet download and update silently for
                  self.downLoadAndUpdate(updateManager);
                } else if (result.cancel) {
                  // User clicks the cancel button to process.
                  // If forced update is required, it will give a double popup.
                  // If not, the code here can delete
                  wx.showModal({
                    title: '警告提示',
                    content:
                      '此版本更新涉及添加新功能，旧版本无法正常访问',
                    showCancel: false, // hide the cancel button
                    // confirmText: 'OK update', // only keep the OK update button
                    success(value) {
                      if (value.confirm) {
                        // Download the new version and reapply
                        self.downLoadAndUpdate(updateManager);
                      }
                    },
                  });
                }
              },
            });
          }
        });
      } else {
        // If you want users to experience your applet
        // on the latest version of the client, you can do this
        wx.showModal({
          title: '提示',
          content:
            '目前的微信版本太低而无法使用此功能。请升级到最新的微信版本，然后重试。',
        });
      }
    },
    downLoadAndUpdate(updateManager) {
      wx.showLoading({
        title: '加载中',
      });
      // Silently download the update applet new version
      updateManager.onUpdateReady(() => {
        wx.hideLoading();
        // The new version has been downloaded,
        // call applyUpdate to apply the new version and restart
        updateManager.applyUpdate();
      });
      updateManager.onUpdateFailed(() => {
        // new version download failed
        wx.showModal({
          title: 'Prologis已有新版本',
          content:
            '新版本在线，请删除当前的applet，重新搜索打开的Prologis',
        });
      });
    },
    checkSystemInfo() {
      wx.getSystemInfo({
        success(res) {
          store.commit('platformCheck', res.platform);
          store.commit('setStatusBarHeight', res.statusBarHeight);
        },
      });
    },
    getLocation() {
      const that = this;
      wx.getLocation({
        type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
        success(result) {
          const userCoordinates = {
            userLatitude: result.latitude,
            userLongitude: result.longitude,
          };
          that.findClosestCenter(userCoordinates);
          store.commit('setUserCoordinates', userCoordinates);
        },
        fail() {
          that.openConfirm();
        },
      });
    },
    findClosestCenter(userCoordinates) {
      const that = this;
      qqmapsdk.calculateDistance({
        from: {
          latitude: userCoordinates.userLatitude,
          longitude: userCoordinates.userLongitude,
        },
        to: store.getters.allCenterLocation,
        success(res) {
          const result = res.result.elements;
          store.commit('caclulateDistance', result);
          const closestCenter = result.sort((a, b) => a.distance - b.distance);
          const closestCenterInfo = store.state.markers.find(
            marker => marker.latitude === closestCenter[0].to.lat
                  && marker.longitude === closestCenter[0].to.lng,
          );
          const nearestCenter = {
            longitude: closestCenterInfo.longitude,
            latitude: closestCenterInfo.latitude,
          };
          that.showClosestCenterAround(nearestCenter);
          store.commit('setClosestCenterInfo', {
            id: closestCenterInfo.id,
            region: closestCenterInfo.region,
            city: closestCenterInfo.city,
            centerName: closestCenterInfo.centerName,
            address: closestCenterInfo.address,
            phoneNumber: closestCenterInfo.phoneNumber,
            area: closestCenterInfo.area,
            avatar: closestCenterInfo.avatar,
            distance: (closestCenter[0].distance / 1000).toFixed(0),
          });
          store.commit('setSelectedCenterId', closestCenterInfo.id);
        },
        fail(error) {
          console.error(error);
        },
      });
    },
    showClosestCenterAround(nearestCenter) {
      this.mapCtx.includePoints({
        padding: [50, 80, 80, 80],
        points: [
          {
            latitude: nearestCenter.latitude,
            longitude: nearestCenter.longitude,
          },
          {
            latitude: this.userCoordinates.userLatitude,
            longitude: this.userCoordinates.userLongitude,
          },
        ],
      });
    },
    openConfirm() {
      const that = this;
      wx.showModal({
        content: '请允许微信访问此设备的位置以获得更好的体验!',
        confirmText: '允许',
        confirmColor: '#008000',
        cancelText: '拒绝',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success() {
                that.getLocation();
              },
            });
          } else {
            that.getLocation();
          }
        },
      });
    },
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success(res) {
          const centerLocationCoordinates = {
            longitude: res.longitude,
            latitude: res.latitude,
          };
          store.commit('setCenterLocation', centerLocationCoordinates);
        },
      });
    },
    zoomInMap() {
      const that = this;
      this.getCenterLocation();
      this.mapCtx.getScale({
        success(res) {
          that.scale = res.scale + 1;
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    zoomOutMap() {
      const that = this;
      this.getCenterLocation();
      this.mapCtx.getScale({
        success(res) {
          that.scale = res.scale - 1;
        },
        fail(error) {
          console.log(error);
        },
      });
    },
    mapTap() {
      store.commit('hideGeneralIntroduction');
    },
    showCenterInformation(event) {
      // display the Center-icon in the center of the map
      const centerId = event.mp.markerId;
      store.commit('centerTheCentre', centerId);
      store.commit('setSelectedCenterId', centerId);
      store.commit('showGeneralIntroduction');
    },
    centerCurrentLocation() {
      this.mapCtx.moveToLocation();
      store.commit('centerCurrentLocation');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../global.scss';
.page-body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.map-section {
  display: flex;
  flex-grow: 1;
  width: 100%;
}
.generalIntroductionBar {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  // height: 215px;
  background: rgba(255,255,255,1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.20);
  overflow: hidden;
  padding-bottom: 20px;
}
.bottomBar {
  position: fixed;
  z-index: 10;
  bottom: 25px;
  left: 15px;
  right: 15px;
}
.zoomBar {
  position: fixed;
  right: 15px;
  bottom: 85px;
}
#myMap {
  position: relative;
  width: 100%;
  height: auto;
}
</style>
