<script>
export default {
  onLaunch() {
    this.autoUpdate();
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
      wx.showLoading();
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
  },
};
</script>

<style>
* {
  font-family: "PingFang SC", sans-serif;
  font-weight: 400;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
