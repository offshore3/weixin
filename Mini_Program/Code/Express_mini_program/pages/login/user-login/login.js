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
      var that = this;
  
      wx.setNavigationBarTitle({
        title: '我的'
      });
  
    //   wx.getSetting({
    //     success: function(res){
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
    //         wx.getUserInfo({
    //           success: function(res) {
    //             wx.navigateTo({
    //                 url: '../../my/my?name='+ res.userInfo.nickName+'&profilePhoto='+res.userInfo.avatarUrl,
    //             });                
    //           }
    //         })
    //       }
    //     }
    //   })
    },

    bindGetUserInfo: function (e) {
        if(e.detail.errMsg == 'getUserInfo:ok'){
          wx.navigateTo({
            url: '../../my/my?name='+ e.detail.userInfo.nickName+'&profilePhoto='+e.detail.userInfo.avatarUrl,
          });
        }
    },

    gotoLogin:function(){
        wx.navigateTo({
            url: '../user-regist/registToLogin',
        })
    }
  })