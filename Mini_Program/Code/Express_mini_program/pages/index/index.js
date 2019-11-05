//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    senderInfo: { name: '刁佳', phoneNumber: "15902221234", address: "陕西省 西安市高新区"},
    recipientInfo:{name:'张三',phoneNumber:'1212',address:'dfdfd'},

    hasSenderInfo: true,
    hasRecipientInfo: false,
    showGoodsCategory:false,
    goodsCategory:'',
    commant:''
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '寄件'
    })
  },

  selectSenderInfo:function(){
    wx.navigateTo({
      url: '../address/list/address-list?type=1',
    })
  },

  selectRecipientInfo: function () {
    wx.navigateTo({
      url: '../address/list/address-list?type=2',
    })
  },
  onSelectGoods:function(){
    this.setData({ showGoodsCategory:true});
     
  },
  onClose:function(){
    this.setData({ showGoodsCategory: false });
  },
  onSelect:function(event){
    console.log(event.detail);
  }
})