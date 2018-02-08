var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    preAmount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.id,
      preAmount: options.preAmount
    })
    this.getData();
  },
  getData() {
    let json = {
      order_id: this.data.order_id
    };
    base.http_post(json, '/orderCenter/queryBuyerOrderInfo', res => {
      if (res.code == 0) {
        let defaultAddress = res.data.defaultAddress;
        let payAddress = wx.getStorageSync('payAddress');
        let address = '';
        if (defaultAddress) {
          address = defaultAddress;
        }
        if (payAddress) {
          address = payAddress;
        }
        this.setData({
          defaultAddress: address,
          orderInfo: res.data.orderInfo,
        })
      } else {
        base.toast('warn', '该商品未发布拼团');
      }
    })
  },
  selectAddr() {
    wx.navigateTo({
      url: '/pages/my/addresslist/addresslist'
    })
  },
  cancelOrder() {
    wx.showModal({
      title: '提示',
      content: '确认取消该订单',
      success: function (res) {
        if (res.confirm) {
          let json = {
            order_id: that.data.order_id
          }
          base.http_post(json, '/orderCenter/cancelBuyerOrder', res => {
            if (res.code == 0) {
              wx.showToast({
                title: res.message,
                icon: 'success',
                duration: 3000
              })
            } else {
              base.toast('warn', '该商品未发布拼团');
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  payOrder() {
    if (this.data.address_id == 0) {
      wx.showToast({
        title: '请选择地址',
        icon: 'loading',
        image: '../../../images/info.png',
      })
      return;
    }
    let json = {
      address_id: this.data.address_id,
      order_id: this.data.order_id,
      pay_mode: 2, //1普通订单支付 2团购订单支付 3加钱购支付
      pay_type: 2, //1.支付宝2.微信3.余额
      receive_address: this.data.defaultAddress.receiver_address,
      receiver_city: this.data.defaultAddress.receiver_city,
      receiver_latitude: 0,
      receiver_longitude: 0,
      receiver_name: this.data.defaultAddress.receiver_name,
      receiver_phone: this.data.defaultAddress.receiver_phone,
      receiver_province: this.data.defaultAddress.receiver_province,
      receiver_region: this.data.defaultAddress.receiver_region
    };
    console.log(json);
    wx.setStorageSync('pay_data', JSON.stringify(json));
    return;
    wx.navigateTo({
      url: '/pages/my/payway/payway?ordertype=1'
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