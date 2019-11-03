// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  gotoSenderInfo:function(){
    wx.navigateTo({
      url: '../address/address-list?type=1',
    })
  },

  gotoRecipientInfo: function () {
    wx.navigateTo({
      url: '../address/address-list?type=2',
    })
  },

  gotoMyDiscountCoupon: function () {
    wx.navigateTo({
      url: '../myDiscountCoupon/list',
    })
  }
})