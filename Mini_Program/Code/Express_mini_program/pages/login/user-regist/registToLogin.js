// pages/my/my.js
Page({

    /**
     * Page initial data
     */
    data: {
      errorMsg:'',
      login:'',
      password:''
    },
  
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我的'
      });
    },
    
    getUserByLogin: function (login,password) {
      // 保存到数据库
      var that = this;
      wx.request({
        url: 'http://localhost:54330/api/users/GetUserByLogin?login=' + login + '&password='+password,
        method: "Get",
        header: {
          'content-type': 'application/json'
        },
        success:function(res){
          if(res.statusCode == 200){
            var userData = {
              name:res.data.login,
              profilePhoto:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
            }

            wx.setStorageSync('userData', userData);
            wx.navigateTo({
              url: '../../my/my',
            });
          }else{
            that.setData({
              errorMsg: '用户名/密码不正确'
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
    
    loginApp: function (e) {
      var selectedItem = e.detail.value;
      
      if (selectedItem.login ==''){
        this.setData({
          errorMsg: '用户名不能为空'
        });
        return;
      } else if (selectedItem.password == '') {
        this.setData({
          errorMsg: '密码不能为空'
        });
        return;
      }
      
      //this.getUserByLogin(selectedItem.login, selectedItem.password);
      
      if(selectedItem.login == 'leo' && selectedItem.password == '123456'){
        var userData = {
          name:'leo',
          profilePhoto:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
        }

        wx.setStorageSync('userData', userData);
        wx.navigateTo({
          url: '../../my/my',
        });
      }else{
        this.setData({
          errorMsg: '用户名/密码不正确'
        });
      }      
    }
  })