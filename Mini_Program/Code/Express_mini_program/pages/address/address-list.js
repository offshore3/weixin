// pages/address/address-list.js
Page({

  /**
   * Page initial data
   */
  data: {
    addresses:[],
    addressType:0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      addressType: options.type
    });
    wx.setNavigationBarTitle({
      title: '寄件人列表'
    });

    var addressItems = [{ name: "test1", phoneNumber: "13679341268", address: "陕西省西安市" }, { name: "test2", phoneNumber: "13679341268", address: "陕西省西安市2" }];

    that.setData({
      addresses: addressItems,
    });
  },

  selectAddress: function (e) {
    var selectedItem = e.currentTarget.dataset.item;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    if(this.data.addressType == 1){
      prevPage.setData({
        senderInfo: selectedItem
      });
    }
    else if (this.data.addressType == 2) {
      prevPage.setData({
        recipientInfo: selectedItem
      });
    }

    // back to main page
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})