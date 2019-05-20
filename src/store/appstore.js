import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    closestCenter: {
      id: '',
      region: '',
      city: '',
      centerName: '',
      distance: '',
    },
    selectedCenterId: '',
    statusBarHeight: 0,
    currentLatitude: '',
    currentLongitude: '',
    isShowGeneralIntroduction: false,
    markers: [
      {
        id: 1,
        latitude: 23.099994,
        longitude: 113.32452,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Center No.1',
        region: 'East China',
        city: 'Wuxi',
        address: 'address 1',
        area: '111,000',
        phoneNumber: 909111111,
        distance: '',
      },
      {
        id: 2,
        latitude: 23.533822,
        longitude: 116.169978,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Center No.2',
        region: 'East China',
        city: 'Wuxi',
        address: 'address 2',
        area: '222,000',
        phoneNumber: 909222222,
        distance: '',
      },
      {
        id: 3,
        latitude: 21.749346,
        longitude: 111.451351,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Center No.3',
        region: 'East China',
        city: 'Wuxi',
        address: 'address 3',
        area: '333,000',
        phoneNumber: 909333333,
        distance: '',
      },
      {
        id: 4,
        latitude: 28.786965,
        longitude: 101.679012,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Center No.4',
        region: 'East China',
        city: 'Wuxi',
        address: 'address 4',
        area: '444,000',
        phoneNumber: 909444444,
        distance: '',
      },
      {
        id: 5,
        latitude: 31.484939,
        longitude: 105.480281,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Center No.5',
        region: 'East China',
        city: 'Wuxi',
        address: 'address 5',
        area: '555,000',
        phoneNumber: 909555555,
        distance: '',
      },
      {
        id: 6,
        latitude: 38.203697,
        longitude: 115.346004,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Center No.6',
        region: 'East China',
        city: 'Wuxi',
        address: 'address 6',
        area: '108,000',
        phoneNumber: 909666666,
        distance: '',
      },
      {
        id: 7,
        latitude: 40.730649,
        longitude: 116.939021,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Beijing',
        region: 'North China',
        city: 'Beijing',
        address: 'address 7',
        area: '777,000',
        phoneNumber: 909777777,
        distance: '',
      },
    ],
  },
  mutations: {
    setStatusBarHeight(state, statusBarHeight) {
      state.statusBarHeight = statusBarHeight;
    },
    showFakeLocation(state, coordinates) {
      // eslint-disable-next-line prefer-destructuring
      state.currentLatitude = coordinates[0];
      // eslint-disable-next-line prefer-destructuring
      state.currentLongitude = coordinates[1];
    },
    setCenterLocation(state, centerLocationCoordinates) {
      state.currentLongitude = centerLocationCoordinates.longitude;
      state.currentLatitude = centerLocationCoordinates.latitude;
    },
    setClosestCenterInfo(state, closestCenterInfo) {
      state.closestCenter.id = closestCenterInfo.id;
      state.closestCenter.region = closestCenterInfo.region;
      state.closestCenter.city = closestCenterInfo.city;
      state.closestCenter.distance = closestCenterInfo.distance;
      state.closestCenter.centerName = closestCenterInfo.centerName;
    },
    setSelectedCenterId(state, selectedCenterId) {
      state.selectedCenterId = selectedCenterId;
    },
    centerCurrentLocation(state) {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          state.currentLatitude = res.latitude; // 21.033333
          state.currentLongitude = res.longitude; // 105.85
          // var speed = res.speed
          // var accuracy = res.accuracy
        },
      });
    },
    centerTheCentre(state, centerID) {
      const centerTapped = state.markers.find(marker => marker.id === +centerID);
      state.currentLatitude = centerTapped.latitude;
      state.currentLongitude = centerTapped.longitude;
    },
    showGeneralIntroduction(state) {
      state.isShowGeneralIntroduction = true;
    },
    hideGeneralIntroduction(state) {
      state.isShowGeneralIntroduction = false;
    },
    caclulateDistance(state, allCenterCoordinates) {
      for (let i = 0; i < state.markers.length; i++) {
        const center = allCenterCoordinates
          .find(value => value.to.lng === state.markers[i].longitude
            && value.to.lat === state.markers[i].latitude);
        state.markers[i].distance = (center.distance / 1000).toFixed(0);
      }
    },
  },
  getters: {
    allCenterLocation(state) {
      const allCenterLocation = [];
      for (let i = 0; i < state.markers.length; i++) {
        allCenterLocation.push({
          latitude: state.markers[i].latitude,
          longitude: state.markers[i].longitude,
        });
      }
      return allCenterLocation;
    },
    selectedCenter(state) {
      let selectedCenter = {};
      selectedCenter = state.markers.find(value => value.id === state.selectedCenterId);
      return selectedCenter;
    },
  },
});

export default store;
