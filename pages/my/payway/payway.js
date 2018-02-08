var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordertype: 1, //1.拼团订单2.加钱购3.企业团购
    add_money_buy: 0,
    pay_way: 1, //1为余额,2.微信
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ordertype: options.ordertype,
      add_money_buy: options.add_money_buy
    })
  },
  SelectPayWay(e) {
    this.setData({
      pay_way: e.currentTarget.dataset.type
    })
  },
  justPay() {
    let pay_data = wx.getStorageSync('pay_data');
    let json = JSON.parse(pay_data);
    if (this.data.ordertype == 1) { //拼团订单
      if (this.data.pay_way == 1) { //余额支付
        json.pay_type = 3;
      } else if (this.data.pay_way == 2) { //微信支付
        json.pay_type = 2;
      } else {
        base.toast('warn', "选择支付方式有误");
        return;
      }
      base.http_post(json, "/user/payCenter/weChatPay", res => {
        if (res.code == 0) {
          if (json.pay_type == 3) { //余额支付
            base.toast('succ', "支付成功");
            wx.navigateTo({
              url: "/pages/my/mygroup/mygroup?type=9"
            });
            return;
          } else { //微信支付
            var wx_nonce_str = res.data.nonce_str,
              wx_package_value = res.data.package_value,
              wx_sign_type = res.data.sign_type,
              wx_pay_sign = res.data.pay_sign,
              wx_time_stamp = res.data.time_stamp;
            this.wxPay(wx_nonce_str, wx_package_value, wx_sign_type, wx_pay_sign, wx_time_stamp);
          }
        } else {
          base.toast('warn', res.message);
        }
      });
    } else if (this.data.ordertype == 2) { //加钱购
      if (this.data.pay_way == 1) { //余额支付
        json.way = 2;
      } else if (this.data.pay_way == 2) { //微信支付
        json.way = 1;
      } else {
        base.toast('warn', "选择支付方式有误");
        return;
      }
      base.http_post(json, "/user/payCenter/addMoneyBuy", res => {
        if (res.code == 0) {
          if (json.way == 2) { //余额支付
            base.toast('succ', "已成功支付" + (this.data.add_money_buy / 100).toFixed(2) + "元");
            wx.navigateTo({
              url: "/pages/my/mygroup/mygroup?type=9"
            });
            return;
          } else { //微信支付
            var wx_nonce_str = res.data.nonce_str,
              wx_package_value = res.data.package_value,
              wx_sign_type = res.data.sign_type,
              wx_pay_sign = res.data.pay_sign,
              wx_time_stamp = res.data.time_stamp;
            this.wxPay(wx_nonce_str, wx_package_value, wx_sign_type, wx_pay_sign, wx_time_stamp);
          }
        } else {
          base.toast('warn', res.message);
        }
      });
    } else if (this.data.ordertype == 3) { //企业团购
      if (this.data.pay_way == 1) {
        json.pay_type = 3; //企业余额支付
      } else if (this.data.pay_way == 2) {
        json.pay_type = 2; //企业微信支付
      } else {
        base.toast('warn', '选择支付方式有误');
        return;
      }
      base.http_post(json, "/user/payCenter/groupWeChatPay", res => {
        if (res.code == 0) {
          if (json.pay_type == 3) {
            base.toast('warn', "支付成功");
            wx.navigateTo({
              url: '/pages/my/myorder/myorder?type=9',
            })
            return;
          } else {
            var wx_nonce_str = res.data.nonce_str,
              wx_package_value = res.data.package_value,
              wx_sign_type = res.data.sign_type,
              wx_pay_sign = res.data.pay_sign,
              wx_time_stamp = res.data.time_stamp;
            this.wxPay(wx_nonce_str, wx_package_value, wx_sign_type, wx_pay_sign, wx_time_stamp);
          }
        } else {
          base.toast('warn', res.message);
        }
      });
    }
  },
  wxPay(wx_nonce_str, wx_package_value, wx_sign_type, wx_pay_sign, wx_time_stamp) {
    wx.requestPayment({
      'timeStamp': wx_time_stamp,
      'nonceStr': wx_nonce_str,
      'package': wx_package_value,
      'signType': wx_sign_type,
      'paySign': wx_pay_sign,
      'success': res => {
        if (this.data.ordertype == 2) {
          base.toast('succ', "已成功支付" + (this.data.add_money_buy / 100).toFixed(2) + "元");
          wx.navigateTo({
            url: '/pages/my/mygroup/mygroup?type=9',
          })
        } else {
          base.toast('warn', "支付成功");
          if (this.data.ordertype == 3) {
            wx.navigateTo({
              url: '/pages/my/myorder/myorder?type=9',
            })
          } else {
            wx.navigateTo({
              url: '/pages/my/mygroup/mygroup?type=9',
            })
          }
        }
      },
      'fail': function (res) {
        console.log(res);
        base.toast('warn', "支付失败或取消支付");
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