// pages/address/address-list.js
Page({

  /**
   * Page initial data
   */
  data: {
    addresses:[],
    addressType:0,
    showOperation:false
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

    var addressItems = wx.getStorageSync('addresses') || []

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
  showOperateOptions: function () {
    this.setData({
      showOperation: !this.data.showOperation
    });
  },
  createAddress: function () {
    wx.navigateTo({
      url: '../create/address-new'
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    var addressItems = wx.getStorageSync('addresses') || []

    this.setData({
      addresses: addressItems,
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  deleteAddress: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  editAddress: function () {

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