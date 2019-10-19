//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   name:'刁佳',
   phoneNumber:'15902221234',
   senderAddress:'陕西省西安市雁塔区 科技三路57号',   
  },
  
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '寄件'
    })
  }
})
