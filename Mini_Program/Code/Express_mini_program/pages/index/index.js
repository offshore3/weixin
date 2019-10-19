//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   name:'刁佳',
   phoneNumber:'15902221234',
   defaultSenderAddress:'',   
  },
  
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '寄件'
    })
  }
})
