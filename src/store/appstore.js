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
    cityFilter: '',
    selectedCenterId: '',
    statusBarHeight: 0,
    currentLatitude: '',
    currentLongitude: '',
    isShowGeneralIntroduction: false,
    isAndroid: false,
    markers: [
      {
        id: 1,
        latitude: 23.099994,
        longitude: 113.32452,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        centerName: 'Wuhan No.1',
        region: 'East China',
        city: 'Wuhan',
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
        centerName: 'Wuxi No.2',
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
        centerName: 'Wuhan No.3',
        region: 'East China',
        city: 'Wuhan',
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
        centerName: 'Wuxi No.4',
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
        centerName: 'Shanghai No.5',
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
        centerName: '北京首都机场第二物流中心', // center No.6
        region: 'East China', // East China
        city: 'Wuxi',
        address: 'address 6',
        area: '108,000',
        phoneNumber: 909666666,
        distance: '',
        avatar:
          'https://cdn.prologis.site/IMAGES/North%20China/Shenyang%20Hunan/icon_Shenyang%20Hunnan.jpg',
      },
      {
        id: 7,
        latitude: 40.730649,
        longitude: 116.939021,
        iconPath: '/static/images/location.png',
        width: 29,
        height: 37,
        region: '华北区', // North China
        city: 'Beijing',
        centerName: '北京首都机场第二物流中心',
        address: '近北京市空港物流园区',
        area: '96,100',
        phoneNumber: {
          areaCode: '021',
          part1: '6482',
          part2: '9472',
          phoneNumber: '02164829472',
        },
        distance: '',
        avatar:
          'https://cdn.prologis.site/IMAGES/East%20China/Shanghai%20Jiuting/icon_Shanghai%20Jiuting.jpg',
        swiper: {
          images: [
            'https://cdn.prologis.site/IMAGES/East%20China/Shanghai%20Jiuting/Photos/Prologis%20Shanghai%20Jiuting%20Logistics%20Center%20%20%281%29.JPG',
            'https://cdn.prologis.site/IMAGES/East%20China/Shanghai%20Jiuting/Photos/Prologis%20Shanghai%20Jiuting%20Logistics%20Center%20%20%283%29.jpg',
          ],
          video: 'https://cdn.prologis.site/Videos/Pologis%20Gedian%20Logistics%20Center.mp4',
        },
        description: {
          overView:
            '该现代化物流园各由一栋单层和双层建筑组成，可租赁面积81,800平方米，先后于2011年和2013年竣工。周边地区均为制造业建筑，限制了新仓库的建设。现代化设计包括早期快速响应灭火喷头系统，属于理想的仓储设施。',
          accessibilities:
            '该配送中心距G1501高速仅0.5公里，距S26高速5公里，距G2高速12公里，距上海虹桥机场也仅15公里。',
        },
        plans: [
          'http://personal.psu.edu/xqz5228/jpg.jpg',
          'https://media.alienwarearena.com/media/1327-a.jpg',
          'http://www.haogongzhang.com/Uploads/baike/201406/53916cf3bc8f1.jpg',
        ],
        map:
          'https://cdn.prologis.site/IMAGES/East%20China/Shanghai%20Jiuting/Map/Shanghai%20Jiuting%20Logistics%20Center.jpg',
        accessibilities: [
          {
            destination: '距苏州市区',
            distance: '15',
          },
          {
            destination: '距苏州工业园区',
            distance: '20',
          },
          {
            destination: '距苏州新区高铁',
            distance: '5',
          },
          {
            destination: '距上海虹桥机场',
            distance: '90',
          },
        ],
        pdf:
          'https://cdn.prologis.site/IMAGES/East%20China/Suzhou%20Xuguan/Prologis%20Suzhou%20Xuguan%20Logistics%20Center%20190220.pdf',
      },
    ],
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
    // showFakeLocation(state, coordinates) {
    //   // eslint-disable-next-line prefer-destructuring
    //   state.currentLatitude = coordinates[0];
    //   // eslint-disable-next-line prefer-destructuring
    //   state.currentLongitude = coordinates[1];
    // },
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
      state.cityFilter = closestCenterInfo.city;
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
