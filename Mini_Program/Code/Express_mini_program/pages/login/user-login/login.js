// pages/my/my.js
Page({

    /**
     * Page initial data
     */
    data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isGetUserInfo:false
    },
  
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我的'
      });
  
      var userData = wx.getStorageSync('userData') || [];
      if(userData){
        console.log('111') 
        console.log(userData) 
      }else{

      }
    },

    bindGetUserInfo: function (e) {
        if(e.detail.errMsg == 'getUserInfo:ok'){
          var userData = {
            name:e.detail.userInfo.nickName,
            profilePhoto:e.detail.userInfo.avatarUrl
          }

          wx.setStorageSync('userData', userData);

          wx.navigateTo({
            url: '../../my/my',
          });
        }
    },

    gotoLogin:function(){
        wx.navigateTo({
            url: '../user-regist/registToLogin',
        })
    }
  })