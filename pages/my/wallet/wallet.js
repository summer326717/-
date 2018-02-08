var base = require('../../../utils/common/base');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_to_bottom: false,
    wallet_list: [],
    balance: 0,
    page_no: 1,
    page_size: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    let json = {
      page_no: this.data.page_no,
      page_size: this.data.page_size
    }
    base.http_post(json, '/user/payCenter/myWallet', res => {
      if (res.code == 0) {
        if (this.data.page_no == 1) {
          this.setData({
            wallet_list: res.data.list,
            balance: res.data.balance
          })
        } else {
          let result = base.concattArr(this.data.wallet_list, res.data.list);
          this.setData({
            wallet_list: result,
            balance: res.data.balance
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
  recharge() {
    wx.navigateTo({
      url: '/pages/my/recharge/recharge',
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