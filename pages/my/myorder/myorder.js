var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_type: 9,
    page_no: 1,
    page_size: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_type: options.type
    })
    if (options.type == 9) {
      this.getData('');
    } else {
      this.getData(options.type);
    }
  },
  changeStatus(e) {
    this.setData({
      order_type: e.currentTarget.dataset.type
    })
    if (e.currentTarget.dataset.type == 9) {
      this.getData('');
    } else {
      this.getData(e.currentTarget.dataset.type);
    }
  },
  getData(state) {
    let json = {
      page_no: this.data.page_no,
      page_size: this.data.page_size,
      state: state
    }
    base.http_post(json, '/orderCenter/queryBuyerOrderList', res => {
      if (res.code == 0) {
        this.setData({
          order_list: res.data.list
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  cancelOrder(e) { //取消订单
    wx.showModal({
      title: '提示',
      content: '确认取消该订单',
      success: function (res) {
        if (res.confirm) {
          let json = {
            order_id: e.currentTarget.dataset.orderid
          }
          base.http_post(json, '/orderCenter/cancelBuyerOrder', res => {
            if (res.code == 0) {
              base.toast('succ', res.message);
              this.getData(this.data.order_type);
            } else {
              base.toast('warn', res.message);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  payOrder(e) { //支付订单
    wx.navigateTo({
      url: "../orderdetail/orderdetail?id=" + e.currentTarget.dataset.orderid + "&preAmount=" + e.currentTarget.dataset.preamount + ""
    })
  },
  confirmReceipt(e) {
    wx.showModal({
      title: '提示',
      content: '确认已收到商品',
      success: function (res) {
        if (res.confirm) {
          let json = {
            order_id: e.currentTarget.dataset.orderid
          }
          base.http_post(json, '/orderCenter/sureReceived', res => {
            if (res.code == 0) {
              base.toast('succ', res.message);
              this.getData(this.data.order_type);
            } else {
              base.toast('warn', res.message);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  assessOrder(e) {
    wx.navigateTo({
      url: "/pages/category/assess/assess?id=" + e.currentTarget.dataset.orderid + "&url=" + e.currentTarget.dataset.goodsicon + ""
    })
  },
  returnMoney(e) {
    wx.navigateTo({
      url: "/pages/my/return/return?id=" + e.currentTarget.dataset.orderid + "&amount=" + e.currentTarget.dataset.amount
    })
  },
  buyAgain(e) {
    wx.navigateTo({
      url: '/pages/category/goods/goods?id=' + e.currentTarget.dataset.goodsid
    })
  },
  jumpGoods() {

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