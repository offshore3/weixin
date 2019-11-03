// pages/my/my.js
Page({

    /**
     * Page initial data
     */
    data: {
      currentTab: 0 
    },
  
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我的优惠券'
      })
    },

    swiperTab: function (e) {
      var that = this;
      that.setData({
       currentTab: e.detail.current
      });
     },

     clickTab: function (e) {
      var that = this;
      if (this.data.currentTab === e.target.dataset.current) {
       return false;
      } else {
       that.setData({
        currentTab: e.target.dataset.current
       })
      }
     }
  })