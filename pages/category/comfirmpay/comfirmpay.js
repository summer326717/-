var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: '',
    spec: '',
    groupsRule: [],
    ssq: '',
    address: '',
    couponsId: '',
    orderid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.setData({
    //  orderid: options.orderid
    //})
    let orderid = options.orderid;
    this.getData(orderid);
  },
  getData(orderid) {
    let json = {
      order_id: orderid
    }
    base.http_post(json, '/orderCenter/queryToPayOrder', res => {
      if (res.code == 0) {
        this.setData({
          orderInfo: res.data.orderInfo,
          spec: res.data.spec,
          groupsRule: res.data.groupsRule,
          ssq: res.data.ssq,
          address: res.data.address,
          orderid: orderid
        })
        let payAddress = wx.getStorageSync('payAddress');
        if (payAddress) {
          payAddress = JSON.parse(payAddress);
          this.setData({
            address: payAddress
          })
        }
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  selectAddr() {
    wx.navigateTo({
      url: '../../my/addresslist/addresslist',
    })
  },
  payMoney() {
    if (this.data.address == null) {
      base.toast('warn', "请先选择地址");
      return;
    }
    if (!this.data.address.address_id) {
      base.toast('warn', "address_id不存在");
      return;
    }
    if (!this.data.address.receiver_address) {
      base.toast('warn', "receiver_address不存在");
      return;
    }
    if (!this.data.address.receiver_city) {
      base.toast('warn', "receiver_city不存在");
      return;
    }
    let json = {
      address_id: this.data.address.address_id,
      order_id: this.data.orderid,
      pay_mode: 2, //1普通订单支付 2团购订单支付 3加钱购支付
      pay_type: 2, //1.支付宝2.微信
      receive_address: this.data.address.receiver_address,
      receiver_city: this.data.address.receiver_city,
      receiver_latitude: 0,
      receiver_longitude: 0,
      receiver_name: this.data.address.receiver_name,
      receiver_phone: this.data.address.receiver_phone,
      receiver_province: this.data.address.receiver_province,
      receiver_region: this.data.address.receiver_region,
      coupons_id: this.data.couponsId
    };
    wx.setStorageSync('pay_data', JSON.stringify(json));
    wx.navigateTo({
      url: '/pages/my/payway/payway?ordertype=1',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})