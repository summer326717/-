var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getMoney(e) {
    this.setData({
      money: e.detail.value
    })
  },
  recharge() {
    if (this.data.money == "") {
      base.toast('warn', "请输入充值金额");
      return;
    }
    if (isNaN(this.data.money)) {
      base.toast('warn', "请输入充值金额");
      return;
    }
    if (this.data.money.length == 9) {
      base.toast('warn', "充值金额不能大于9位");
      return;
    }
    let json = {
      money: parseFloat(this.data.money * 100),
      pay_type: 2 //1支付宝 2微信
    };
    base.http_post(json, '/user/payCenter/rechargeWallet', res => {
      if (res.code == 0) {
        var wx_nonce_str = res.data.nonce_str,
          wx_package_value = res.data.package_value,
          wx_sign_type = res.data.sign_type,
          wx_pay_sign = res.data.pay_sign,
          wx_time_stamp = res.data.time_stamp;
        wx.requestPayment({
          'timeStamp': wx_time_stamp,
          'nonceStr': wx_nonce_str,
          'package': wx_package_value,
          'signType': wx_sign_type,
          'paySign': wx_pay_sign,
          'success': res => {
            base.toast('succ', "充值成功");
          },
          'fail': res => {
            console.log(res);
            base.toast('warn', "支付失败或取消支付");
          }
        });
      } else {
        base.toast('warn', res.message);
      }
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