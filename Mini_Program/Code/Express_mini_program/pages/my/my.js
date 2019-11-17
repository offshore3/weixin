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

    console.log(options)

    wx.setNavigationBarTitle({
      title: '我的'
    });

    var photo = this.data.src;
    if(options.profilePhoto){
      photo = options.profilePhoto
    }

    that.setData({
      profilePhoto:photo,
      name:options.name
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

  gotoLogout:function(){
    wx.navigateTo({
      url: '../login/user-regist/registToLogin',
    })
  }
})