// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    profilePhoto:'',
    name:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '我的'
    });

    var userData = wx.getStorageSync('userData')
    if(userData){
      var profilePhoto = userData.profilePhoto == '' 
        ? this.data.src
        : userData.profilePhoto
      
      that.setData({
        profilePhoto:userData.profilePhoto,
        name:userData.name
      })
    }else{
      wx.navigateTo({
        url: '../login/user-login/login',
      })
    }
  },

  gotoSenderInfo:function(){
    wx.navigateTo({
      url: '../address/list/address-list?type=1',
    })
  },

  gotoRecipientInfo: function () {
    wx.navigateTo({
      url: '../address/list/address-list?type=2',
    })
  },

  gotoMyDiscountCoupon: function () {
    wx.navigateTo({
      url: '../myDiscountCoupon/list',
    })
  },

  gotoLogout:function(){
    wx.clearStorageSync();
        
    wx.switchTab({
      url:'../index/index'
    });
  }  
})