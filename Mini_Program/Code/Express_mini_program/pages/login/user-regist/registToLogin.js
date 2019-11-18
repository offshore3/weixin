// pages/my/my.js
Page({

    /**
     * Page initial data
     */
    data: {
      name: ''
    },
  
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我的'
      });
    },

    bindGetUserInfo: function (e) {
        if(e.detail.errMsg == 'getUserInfo:ok'){
          wx.navigateTo({
            url: '../../my/my?name='+ e.detail.userInfo.nickName+'&profilePhoto='+e.detail.userInfo.avatarUrl,
          });
        }
    },

    gotoLogin:function(e){
        //TODO Change the name
        wx.navigateTo({
            url: '../../my/my?name='+ '123456',
        })
    }
  })