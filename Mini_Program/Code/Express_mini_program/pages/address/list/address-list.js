// pages/address/address-list.js
Page({

  /**
   * Page initial data
   */
  data: {
    errorMsg: '',
    addresses:[],
    addressType:0,
    showOperation:false,
    _options:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    var title = '';
    if(options.type == '1'){
      title = '寄件人列表';
    }else if(options.type == '2'){
      title = '收件人列表';
    }

    that.setData({
      addressType: options.type,
      _options: options
    });
    wx.setNavigationBarTitle({
      title: title
    });

    // var addressItems = wx.getStorageSync('addresses') || []

    // that.setData({
    //   addresses: addressItems,
    // });
  },

  selectAddress: function (e) {
    var selectedItem = e.currentTarget.dataset.item;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    if(this.data.addressType == 1){
      prevPage.setData({
        senderInfo: selectedItem
      });
    }
    else if (this.data.addressType == 2) {
      prevPage.setData({
        recipientInfo: selectedItem
      });
    }

    // back to main page
    wx.navigateBack({
      delta: 1
    });
  },
  showOperateOptions: function () {
    this.setData({
      showOperation: !this.data.showOperation
    });
  },
  createAddress: function () {
    wx.navigateTo({
      url: '../create/address-new'
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    // var addressItems = wx.getStorageSync('addresses') || []

    // this.setData({
    //   addresses: addressItems,
    // });
    this.loadData();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  deleteAddress: function (e) {
    var selectedItem = e.currentTarget.dataset.item;
    var that = this;
    wx.request({
      url: 'http://localhost:5000/api/shippingaddresses/' + selectedItem.shippingAddressId,
      method: "Delete",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.loadData();
      },
      fail: function (res) {
        that.setData({
          errorMsg: res.errMsg
        });
      }
    })
  },

  /**
   * Page event handler function--Called when user drop down
   */
  editAddress: function (e) {
    var selectedItem = e.currentTarget.dataset.item;
    wx.setStorageSync('addressToEdit', selectedItem);

    wx.navigateTo({
      url: '../create/address-new'
    })
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  loadData: function () {
    //从数据库加载数据
    var that = this;
    wx.request({
      url: 'http://localhost:5000/api/shippingaddresses',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            addresses: res.data
          });
        }else{
          that.setData({
            errorMsg: '数据加载失败'
          });
        }
      },
      fail: function (res) {
        that.setData({
          errorMsg: res.errMsg
        });
      }
    })
  }
})