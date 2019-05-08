import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentLatitude: '',
    currentLongitude: '',
    isGeneralIntroduction: false,
    markers: [
      {
        id: 1,
        latitude: 23.099994,
        longitude: 113.32452,
        name: 'T.I.T',
        title: 'marker title',
        iconPath: '/static/images/location.png',
        description: 'Xin chao 1',
        address: 'address 1',
        openTime: '8AM',
        phoneNumber: 909111111,
      },
      {
        id: 2,
        name: 'Center No.2',
        latitude: 23.533822,
        longitude: 116.169978,
        iconPath: '/static/images/location.png',
        description: 'Xin chao 2',
        address: 'address 2',
        openTime: '9AM',
        phoneNumber: 909222222,
      },
      {
        id: 3,
        name: 'Center No.3',
        latitude: 21.749346,
        longitude: 111.451351,
        iconPath: '/static/images/location.png',
        description: 'Xin chao 3',
        address: 'address 3',
        openTime: '10AM',
        phoneNumber: 909333333,
      },
      {
        id: 4,
        name: 'Center No.4',
        latitude: 28.786965,
        longitude: 101.679012,
        iconPath: '/static/images/location.png',
        description: 'Xin chao 4',
        address: 'address 4',
        openTime: '11AM',
        phoneNumber: 909444444,
      },
      {
        id: 5,
        name: 'Center No.5',
        latitude: 31.484939,
        longitude: 105.480281,
        iconPath: '/static/images/location.png',
        description: 'Xin chao 5',
        address: 'address 5',
        openTime: '12AM',
        phoneNumber: 909555555,
      },
      {
        id: 6,
        name: 'Center No.6',
        latitude: 38.203697,
        longitude: 115.346004,
        iconPath: '/static/images/location.png',
        description: 'Xin chao 6',
        address: 'address 6',
        openTime: '13PM',
        phoneNumber: 909666666,
      },
      {
        id: 7,
        name: 'Beijing',
        latitude: 40.730649,
        longitude: 116.939021,
        iconPath: '/static/images/location.png',
        description: 'Xin chao 7',
        address: 'address 7',
        openTime: '14PM',
        phoneNumber: 909777777,
      },
    ],
  },
  mutations: {
    showFakeLocation(state, coordinates) {
      // eslint-disable-next-line prefer-destructuring
      state.currentLatitude = coordinates[0];
      // eslint-disable-next-line prefer-destructuring
      state.currentLongitude = coordinates[1];
    },
    showCurrentLocation(state) {
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
      state.isGeneralIntroduction = true;
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
  },
});

export default store;
