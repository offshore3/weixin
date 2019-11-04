// pages/address/create/address-new.js
Page({

  /**
   * Page initial data
   */
  data: {
    errorMsg:'',
    address:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  validateTel: function (e) {
    this.setData({
      errorMsg: '请输入正确的电话号码'
    });
  },

  selectAddress() {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          console.log("111")
          wx.chooseAddress({
            success(res) {
              that.setData({
                address: { name: res.userName, phoneNumber: res.telNumber, addressmain: res.countyName + ' ' + res.cityName + ' ' + res.provinceName + ' ' + res.cityName, addressdetail: res.detailInfo }
              });
            }
          })
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

        } else {
          if (res.authSetting['scope.address'] == false) {
            console.log("222")
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)

              }
            })
          } else {
            console.log("eee")
            wx.chooseAddress({
              success(res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
              }
            })
          }
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  formSubmit: function (e) {
    var selectedItem = e.detail.value;

    if (selectedItem.name==''){
      this.setData({
        errorMsg: '请输入正确的收件人姓名'
      });
    } else if (selectedItem.phoneNumber == '') {
      this.setData({
        errorMsg: '请输入正确的电话号码'
      });
    } else if (selectedItem.address1 == '') {
      this.setData({
        errorMsg: '请输入正确的省、市、区'
      });
    } else if (selectedItem.address2 == '') {
      this.setData({
        errorMsg: '请输入正确的详细地址'
      });
    }

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var items = prevPage.data.addresses;
    var address = selectedItem.address1 + ' ' + selectedItem.address2;
    selectedItem.address = address;
    items.push(selectedItem);
    prevPage.setData({
      addresses: items
    });

    var addressItems = wx.getStorageSync('addresses') || []
    var address = selectedItem.address1 + ' ' + selectedItem.address2;
    selectedItem.address = address;
    addressItems.push(selectedItem);
    wx.setStorageSync('addresses', addressItems);

    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})