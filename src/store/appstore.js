import Vue from 'vue';
import Vuex from 'vuex';
import centers from './data';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userCoordinates: {
      userLatitude: '',
      userLongitude: '',
    },
    closestCenter: {
      id: '',
      region: '',
      city: '',
      centerName: '',
      address: '',
      phoneNumber: '',
      area: '',
      avatar: '',
      distance: '',
    },
    cityFilter: '',
    selectedCenterId: '',
    statusBarHeight: 0,
    mapLatitude: '',
    mapLongitude: '',
    isShowGeneralIntroduction: false,
    isAndroid: false,
    markers: centers,
  },
  mutations: {
    platformCheck(state, platform) {
      if (platform !== 'ios') {
        state.isAndroid = true;
      }
    },
    setStatusBarHeight(state, statusBarHeight) {
      state.statusBarHeight = statusBarHeight;
    },
    setUserCoordinates(state, userCoordinates) {
      const coordinates = state.userCoordinates;
      coordinates.userLatitude = userCoordinates.userLatitude;
      coordinates.userLongitude = userCoordinates.userLongitude;
    },
    setCenterLocation(state, centerLocationCoordinates) {
      state.mapLongitude = centerLocationCoordinates.longitude;
      state.mapLatitude = centerLocationCoordinates.latitude;
    },
    setClosestCenterInfo(state, closestCenterInfo) {
      const center = state.closestCenter;
      center.id = closestCenterInfo.id;
      center.region = closestCenterInfo.region;
      center.city = closestCenterInfo.city;
      center.distance = closestCenterInfo.distance;
      center.centerName = closestCenterInfo.centerName;
      center.address = closestCenterInfo.address;
      center.phoneNumber = closestCenterInfo.phoneNumber;
      center.area = closestCenterInfo.area;
      center.avatar = closestCenterInfo.avatar;
      state.cityFilter = closestCenterInfo.city;
    },
    setSelectedCenterId(state, selectedCenterId) {
      state.selectedCenterId = selectedCenterId;
    },
    centerCurrentLocation(state) {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          state.mapLatitude = res.latitude;
          state.mapLongitude = res.longitude;
        },
      });
    },
    centerTheCentre(state, centerID) {
      const centerTapped = state.markers.find(marker => marker.id === +centerID);
      state.mapLatitude = centerTapped.latitude;
      state.mapLongitude = centerTapped.longitude;
    },
    showGeneralIntroduction(state) {
      state.isShowGeneralIntroduction = true;
    },
    hideGeneralIntroduction(state) {
      state.isShowGeneralIntroduction = false;
    },
    caclulateDistance(state, allCenterCoordinates) {
      for (let i = 0; i < state.markers.length; i++) {
        const center = allCenterCoordinates.find(
          value => value.to.lng === state.markers[i].longitude
            && value.to.lat === state.markers[i].latitude,
        );
        state.markers[i].distance = (center.distance / 1000).toFixed(0);
      }
    },
    setCityFilter(state, cityFilter) {
      state.cityFilter = cityFilter;
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
    centerFilter(state) {
      let centerFilter = [];
      centerFilter = state.markers
        .filter(value => value.city === state.cityFilter)
        .sort((a, b) => a.distance - b.distance);
      return centerFilter;
    },
  },
});

export default store;
