// pages/address/create/address-new.js

var QQMapWX = require('../../../lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js');
var qqmapsdk;

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
    qqmapsdk = new QQMapWX({
      key: 'PTBBZ-4RICU-UATVH-2TMJL-JKMO7-IXFBW' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });

    var addressToEdit = wx.getStorageSync('addressToEdit');
    if (addressToEdit){
      this.setData({
        address: { shippingAddressId: addressToEdit.shippingAddressId, name: addressToEdit.name, phoneNumber: addressToEdit.tel, addressmain: addressToEdit.stateProvince, addressdetail: addressToEdit.address }
      });
    }
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
      return;
    } else if (selectedItem.phoneNumber == '') {
      this.setData({
        errorMsg: '请输入正确的电话号码'
      });
      return;
    } else if (selectedItem.address1 == '') {
      this.setData({
        errorMsg: '请输入正确的省、市、区'
      });
      return;
    } else if (selectedItem.address2 == '') {
      this.setData({
        errorMsg: '请输入正确的详细地址'
      });
      return;
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

    wx.setStorageSync('addresses', items);
    // wx.navigateBack({
    //   delta: 1
    // });

    if(selectedItem.shippingAddressId){
      this.updateDatatoDB(selectedItem);
    }else{
      this.saveDatatoDB(selectedItem);
    }
  },

  saveDatatoDB: function (selectedItem) {
    // 保存到数据库
    var that = this;
    wx.request({
      url: 'http://localhost:5000/api/shippingaddresses',
      data: { name: selectedItem.name, tel: selectedItem.phoneNumber, address: selectedItem.address2, stateProvince: selectedItem.address1, city: selectedItem.address1 },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        if(res.statusCode == 201){
          that.setData({
            errorMsg: '保存成功'
          });
          wx.navigateBack({
            delta: 1
          });
        }else{
          that.setData({
            errorMsg: '保存失败'
          });
        }
      },
      fail: function (res) {
        that.setData({
          errorMsg: res.errMsg
        });
      }
    })
  },

  updateDatatoDB: function (selectedItem) {
    // 保存到数据库
    var that = this;
    wx.request({
      url: 'http://localhost:5000/api/shippingaddresses/' + selectedItem.shippingAddressId,
      data: { shippingAddressId: selectedItem.shippingAddressId, name: selectedItem.name, tel: selectedItem.phoneNumber, address: selectedItem.address2, stateProvince: selectedItem.address1, city: selectedItem.address1 },
      method: "PUT",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 204) {
          that.setData({
            errorMsg: '保存成功'
          });
          wx.navigateBack({
            delta: 1
          });
        } else {
          that.setData({
            errorMsg: '保存失败'
          });
        }
      },
      fail: function (res) {
        that.setData({
          errorMsg: res.errMsg
        });
      }
    })
  },

  /**
   * Lifecycle function--Called when page unload
   */
  selectLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.getLocationInfo(res.latitude, res.longitude, res.address + ' ' + res.name);
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },

  // 获取当前地理位置
  getLocationInfo: function (latitude, longitude, address) {
    let that = this;
    let currentAddress = that.data.address;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("getLocal");
        console.log(res);
        let province = res.result.ad_info.province;
        let city = res.result.ad_info.city;
        let district = res.result.ad_info.district;
        address = address.replace(province + city + district, '');

        that.setData({
          address: { name: currentAddress.name, phoneNumber: currentAddress.phoneNumber, addressmain: province + ' ' + city + ' ' + district, addressdetail: address }
        });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
      }
    });
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