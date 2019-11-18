//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    senderInfo: { name: '刁佳', phoneNumber: "15902221234", address1: "陕西省西安市雁塔区", address2:"科技三路57号融城云谷"},
    recipientInfo:{name:'张三',phoneNumber:'13400944221',address1:'陕西省西安市莲湖区',address2:"丰登南路96号丰登公寓"},
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