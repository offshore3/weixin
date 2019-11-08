// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isGetUserInfo:false,
    user:{
      profilePhoto:'',
      name:'',
      phone:''
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '我的'
    });

    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                isGetUserInfo: true,
                user:{
                  profilePhoto:res.userInfo.avatarUrl,
                  name:res.userInfo.nickName,
                  phone:'158****9170'
                }
              });
            }
          })
        }
      }
    })
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

  bindGetUserInfo: function (e) {
    if(e.detail.errMsg == 'getUserInfo:ok'){
      var that = this;
    
      that.setData({
        isGetUserInfo: true,
        user:{
          profilePhoto:e.detail.userInfo.avatarUrl,
          name:e.detail.userInfo.nickName,
          phone:'158****9170'
        }
      });
    }
  },

  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})