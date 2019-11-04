//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    senderInfo: { name: '刁佳', phoneNumber: "15902221234", address: "陕西省 西安市高新区"},
    recipientInfo:{},

    hasSenderInfo: true,
    hasRecipientInfo: false
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '寄件'
    })
  },

  selectSenderInfo:function(){
    wx.navigateTo({
      url: '../address/list/address-list?type=1',
    })
  },

  selectRecipientInfo: function () {
    wx.navigateTo({
      url: '../address/list/address-list?type=2',
    })
  }
})