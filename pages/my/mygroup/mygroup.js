var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_type: 9,
    page_no: 1,
    page_size: 10,
    order_list: [],
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
  changeStatus: function (e) {
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
    base.http_post(json, '/orderCenter/queryBuyerGroupOrderList', res => {
      if (res.code == 0) {
        if (this.data.page_no == 1) {
          this.setData({
            order_list: res.data.list
          })
        } else {
          let result = base.concattArr(this.data.order_list, res.data.list);
          this.setData({
            order_list: result
          })
          if (res.data.list.length < this.data.page_size) {
            this.setData({
              is_to_bottom: true
            })
          }
        }

      } else {
        base.toast('warn', res.message);
      }
    })
  },
  toGroup(e) {
    //点击拼团中、拼团成功的商品，跳转到参团页面
    console.log(e.currentTarget.dataset.i);
    wx.navigateTo({
      url: "../../category/joingroup/joingroup"
    })
  },
  cancelOrder(e) {
    wx.showModal({
      title: '提示',
      content: '确认取消该订单',
      success: res => {
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
  payOrder(e) {
    wx.navigateTo({
      url: "../orderdetail/orderdetail?id=" + e.currentTarget.dataset.orderid + "&preAmount=" + e.currentTarget.dataset.preamount + ""
    })
  },
  backMoney(e) {
    wx.showModal({
      title: '提示',
      content: '确定退款，取消订单?',
      success: res => {
        if (res.confirm) {
          let json = {
            order_id: e.currentTarget.dataset.orderid
          }
          base.http_post(json, '/user/payCenter/refund', res => {
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
  addBuy(e) {
    let json = {
      order_id: e.currentTarget.dataset.orderid,
      way: 1 //1 微信支付 2 余额支付
    };
    sessionStorage.setItem("pay_data", JSON.stringify(json));
    wx.navigateTo({
      url: "../payway/payway?ordertype=2&add_money_buy=" + e.currentTarget.dataset.num
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
    this.setData({
      page_no: 1
    })
    this.getData();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.is_to_bottom) {
      wx.showNavigationBarLoading();
      this.setData({
        page_no: this.data.page_no + 1
      })
      this.getData();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})